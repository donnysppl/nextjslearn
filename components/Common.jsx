import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Common() {
    const {data:session} = useSession();
    const userSession = session && session;
    const userSessionId = session && session.user.id;

    const router = useRouter();
  return {userSession, userSessionId, router}
}
