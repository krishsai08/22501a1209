// logging-middleware/log.js
import axios from 'axios';

const LOG_API = 'http://20.244.56.144/evaluation-service/logs';

const VALID_STACKS = ['frontend', 'backend'];
const VALID_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];
const VALID_FRONTEND_PACKAGES = [
  'api', 'component', 'hook', 'page', 'state', 'style',
  'auth', 'config', 'handler'
];

/**
 * Reusable logging middleware
 */
export async function log(stack, level, pkg, message) {
  if (
    !VALID_STACKS.includes(stack) ||
    !VALID_LEVELS.includes(level) ||
    !VALID_FRONTEND_PACKAGES.includes(pkg)
  ) {
    console.warn('Invalid logging parameters:', { stack, level, pkg });
    return;
  }

  try {
    await axios.post(LOG_API, {
      stack,
      level,
      package: pkg,
      message,
    });
    console.info('[Logged]', { stack, level, pkg, message });
  } catch (err) {
    console.error('[Logging Error]', err.message);
  }
}
