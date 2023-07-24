import {expect, afterEach} from "vitest";
import {cleanup} from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

// @ts-ignore
import { server } from './src/mocks/server.js'

expect.extend(matchers);

afterEach(() => {
    cleanup();
})

// src/setupTests.js
// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())