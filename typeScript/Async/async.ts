export {};

function prom() {
  return new Promise<number>((resolve) => {
    console.log("Success");
    resolve(28);
  });
}
prom().then((value) => console.log(value));

async function add(a: number, b: number): Promise<number> {
  return a + b;
}

const NotDoingWork = true;
const WatchingMovies = true;

function BootCampCallBack(
  callback: (result: { name: string; message: string }) => void,
  errorCallback: (error: { name: string; message: string }) => void
) {
  if (NotDoingWork) {
    errorCallback({ name: "Not Doing work", message: " :(" });
  } else if (WatchingMovies) {
    errorCallback({ name: "Preffering movies", message: "Interests > Career" });
  } else {
    callback({ name: "He is doing good", message: "Hired" });
  }
}

BootCampCallBack(
  (result) => console.log("Hey,", result.name, result.message),
  (error) => console.log(error.name, error.message)
);
//Promise
function BootCampPromise(): Promise<{ name: string; message: string }> {
  return new Promise((resolve, reject) => {
    if (NotDoingWork) reject({ name: "Not Doing work", message: " :(" });
    else if (WatchingMovies)
      reject({ name: "Preffering movies", message: "Interests > Career" });
    else resolve({ name: "He is doing good", message: "Hired" });
  });
}

interface user {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<user> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: "ZAde",
        email: `user${id}@example.com`,
      });
    }, 4000);
  });
}

async function getUserProfile() {
  const user = await fetchUser(123);
  console.log(user.name, user.email);
}

async function Main() {
  console.log("Fetching user...");

  const user = await fetchUser(123);
  console.log(user.id);
}
Main();

//

interface User {
  id: number;
  name: string;
  email: string;
}

async function sequential() {
  console.time("Sequential");
  const user1 = await fetchUser(1);
  const user2 = await fetchUser(2);
  console.timeEnd("Sequential");
  return [user1, user2];
}

async function parallel() {
  console.time("Parallel");
  const [user1, user2] = await Promise.all([fetchUser(1), fetchUser(2)]);
  console.timeEnd("Parallel");
  return [user1, user2];
}
async function allSettledExample() {
  console.time("AllSettled");
  const results = await Promise.allSettled([
    fetchUser(1),
    Promise.reject(new Error("User 2 failed")),
    fetchUser(3),
  ]);

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`User ${i + 1}:`, result.value);
    } else {
      console.log(`User ${i + 1} failed:`, result.reason);
    }
  });
  console.timeEnd("AllSettled");
}

async function sample() {
  await sequential();
  await parallel();
  await allSettledExample();
}

sample();

// 4 TimeOuts
function timeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
    ),
  ]);
}

async function verifyTimeout() {
  console.time("Timeout test");
  const slowPromise = fetchUser(1);
  const timedOutPromise = timeout(slowPromise, 500);

  try {
    const user = await timedOutPromise;
    console.log(" Got user:", user);
  } catch (error: any) {
    if (error instanceof error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
  }
  console.timeEnd("Timeout test");
}
verifyTimeout();

// 5 .Retries with Backoff

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface TransientError extends Error {
  retryable: true;
}

function isTransientError(err: unknown): err is TransientError {
  return err instanceof Error && "retryable" in err && err.retryable === true;
}

async function retry<T>(
  op: () => Promise<T>,
  attempts: number = 2,
  backoffMs: number = 250
): Promise<T> {
  try {
    return await op();
  } catch (error) {
    if (attempts === 0 || !isTransientError(error)) {
      throw error; //
    }

    console.log(`There are (${attempts} left)`);
    await sleep(backoffMs);
    return retry(op, attempts - 1, backoffMs * 2);
  }
}

// 6 .Cancellation with abort COntroller

function withTimeoutSignal(ms: number): {
  controller: AbortController;
  signal: AbortSignal;
} {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, ms);

  return { controller, signal: controller.signal };
}

async function mockFetch(
  url: string,
  opts: { signal?: AbortSignal } = {}
): Promise<string> {
  const { signal } = opts;

  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error("Aborted before start"));
      return;
    }

    const work = setTimeout(() => {
      resolve("OK: " + url);
    }, 3000);

    signal?.addEventListener("abort", () => {
      clearTimeout(work);
      reject(new Error("Fetch aborted by timeout"));
    });
  });
}

async function testAbortOnce() {
  const { signal } = withTimeoutSignal(500);

  try {
    const res = await mockFetch(
      "https://fullstack.own1.aganitha.ai/typescript/07-async/",
      { signal }
    );
    console.log("Result:", res);
  } catch (err) {
    console.log("Error:", (err as Error).message);
  }
}

// 7 .

class Semaphore {
  private count: number;
  private waiters: Array<() => void> = [];

  constructor(initialCount: number) {
    this.count = initialCount;
  }

  async acquire(): Promise<void> {
    if (this.count > 0) {
      this.count--;
      return;
    }
    return new Promise<void>((resolve) => {
      this.waiters.push(resolve);
    });
  }

  release(): void {
    if (this.waiters.length > 0) {
      const resolve = this.waiters.shift()!;
      resolve();
    } else {
      this.count++;
    }
  }
}

const inv = (): void => {
  return;
};

async function runWithLimit<T>(
  limit: number,
  tasks: Array<() => Promise<T>>
): Promise<T[]> {
  const semaphore = new Semaphore(limit);
  const results: T[] = new Array(tasks.length);

  const promises = tasks.map(async (task, index) => {
    await semaphore.acquire();
    try {
      const result = await task();
      results[index] = result;
    } finally {
      semaphore.release();
    }
  });

  await Promise.all(promises);
  return results;
}

async function validating(): Promise<void> {
  const limit = 3;
  let running = 0;
  let maxRunning = 0;

  const makeTask = (id: number) => async () => {
    running++;
    maxRunning = Math.max(maxRunning, running);
    console.log(`Task ${id} started. Running = ${running}`);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`Task ${id} finished. Running = ${running}`);
    running--;
    return id;
  };

  const tasks: Array<() => Promise<number>> = [];
  for (let i = 0; i < 10; i++) {
    tasks.push(makeTask(i));
  }

  const results = await runWithLimit(limit, tasks);
  console.log("Results:", results);
  console.log("Max concurrent running:", maxRunning);
}

//  8

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

async function safeAsyncOperation<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const value = await promise;
    return { ok: true, value };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function fetchData(): Promise<any> {
  const response = await fetch("https://www.youtube.com/");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

async function main() {
  const result = await safeAsyncOperation(fetchData());
  if (result.ok) {
    console.log("Success:", result.value);
  } else {
    console.error("Error:", result.error);
  }
}

main();

// 9
