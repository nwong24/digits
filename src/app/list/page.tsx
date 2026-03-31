import { Col, Container, Row } from 'react-bootstrap';
// import { Contact } from '@/lib/validationSchemas';
import ContactCard from '@/components/ContactCard';
import { prisma } from '@/lib/prisma';
/*
import StuffItem from '@/components/StuffItem';
*/
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

/** Render a list of stuff for the logged in user. */
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
    where: { owner },
  });
  console.log(contacts);
  /*
  const stuff = await prisma.stuff.findMany({
    where: {
      owner,
    },
  });
  */
  // console.log(stuff);
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
            <Col key={`Contact-${contact.firstName}`}>
              <ContactCard contact={contact} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
