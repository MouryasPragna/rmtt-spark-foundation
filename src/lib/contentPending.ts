/**
 * "Client approval pending" flags are for review, not for visitors. They show in development
 * (including the Lovable editor preview) and in builds made with VITE_SHOW_PENDING=true;
 * production builds hide the flags and leave out blocks whose only content is a pending flag.
 */
export const SHOW_PENDING = Boolean(import.meta.env?.DEV) || import.meta.env?.VITE_SHOW_PENDING === 'true';
