'use client';

// import useInactivityHandler from '@/hooks/useInactivityHandler';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // useInactivityHandler(); // Hook to monitor user activity

  return <>{children}</>; // Render the children (page content)
}
