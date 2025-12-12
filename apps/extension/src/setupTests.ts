import * as matchers from '@testing-library/jest-dom/matchers'
import { expect, vi } from 'vitest'

expect.extend(matchers)

// Mock Chrome API
global.chrome = {
    storage: {
        local: {
            get: vi.fn((_keys: any, cb: any) => cb({})),
            set: vi.fn(),
            remove: vi.fn(),
        },
    },
    tabs: {
        query: vi.fn().mockResolvedValue([{ id: 1 }]),
        sendMessage: vi.fn().mockResolvedValue({}),
        create: vi.fn(),
    },
    runtime: {
        sendMessage: vi.fn(),
        onMessage: {
            addListener: vi.fn(),
        },
    },
    cookies: {
        get: vi.fn(),
    },
} as any

// Mock CSS imports matching generic names if alias doesn't catch them
