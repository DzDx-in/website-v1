import { redirect } from 'next/navigation';

export default function TRFRedirect() {
  redirect('/the-real-feed');
}
