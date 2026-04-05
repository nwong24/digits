import { Col, Container, Row } from 'react-bootstrap';
import ContactCard from '@/components/ContactCard';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  const contacts = await prisma.contact.findMany({
    where: {
      owner,
    },
  });
  const notes = await prisma.note.findMany({
    where: {
      owner,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row className="mb-3">
          <Col>
            <h1 className="text-center">Contacts</h1>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact) => (
            <Col key={`Contact-${contact.id}`}>
              <ContactCard
                contact={contact}
                notes={notes.filter((note) => note.contactId === contact.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
