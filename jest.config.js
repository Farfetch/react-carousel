module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    moduleNameMapper: {
        '\\.(scss|css|svg|jpg|png)$': 'identity-obj-proxy',
    },
    setupFiles: ['./tests/setup.js'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['/node_modules/'],
    testPathIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
    coveragePathIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
    snapshotSerializers: ['@emotion/jest/serializer'],
};
