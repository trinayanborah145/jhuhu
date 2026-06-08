import ChatWidget from '@/components/ChatWidget';

export default function EmbedPage() {
  const companyName = process.env.COMPANY_NAME || 'Sukrit Infras';
  const companyPhone = process.env.COMPANY_PHONE || '+91 9101002790';
  const ownerName = process.env.OWNER_FIRST_NAME || 'the Sukrit team';

  return (
    <html style={{ background: 'transparent' }}>
      <body style={{ background: 'transparent', margin: 0, padding: 0, overflow: 'hidden' }}>
        <ChatWidget
          companyName={companyName}
          companyPhone={companyPhone}
          ownerName={ownerName}
          embedMode={true}
        />
      </body>
    </html>
  );
}
