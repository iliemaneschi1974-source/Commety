import ChatClient from "@/components/Chat/ChatClient";

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ utente?: string }>;
}) {
  const { utente } = await searchParams;

  return <ChatClient recipientId={utente} />;
}
