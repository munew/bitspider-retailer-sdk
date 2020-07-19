"use strict";
const path = require("path");
const packageJson = require("../../package.json");

module.exports = {
  DEBUG: false,
  LOG_LEVEL: "info",
  MUNEW_BASE_URL:'http://localhost:9099',
  GLOBAL_ID: undefined,
  SERVICE_NAME: packageJson.name,
  LOG_FILES_PATH: path.join(__dirname, "../public/log"),
  ERROR_LOG_FILE_NAME: "error.log",
  COMBINED_LOG_FILE_NAME: "combined.log",
  HEADLESS_AGENT_TYPE: "HEADLESSBROWSER",
  SERVICE_AGENT_TYPE: "SERVICE",
  // DIA Server Configuration
  ADD_TASKS_PATH: "/apis/intelligences",
  ADD_TASKS_METHOD: "POST",
  ENGINE_API_KEY: undefined,
  REQUEST_TIMEOUT: 30 * 1000, // Request timeout, include send to SOI or DIA

  // unconfigurable from option
  X_SECURITY_KEY_HEADER: "x-munew-security-key",
  X_REQUESTED_WITH: "x-munew-requested-with", // who send this request
  X_SERIAL_ID: "x-munew-serial-id", // request serial id
  X_JOB_ID: "x-munew-job-id" // each request is a job
};