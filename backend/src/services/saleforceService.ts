import * as dotenv from 'dotenv';
import { Connection } from 'jsforce';

dotenv.config();

const {SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN} = process.env;

const conn = new Connection({
  loginUrl: SF_LOGIN_URL
});

async function loginToSalesforce() {
    try {
      await conn.login(
        SF_USERNAME || '',
        SF_PASSWORD + SF_TOKEN! || ''
      );
      console.log('Salesforce login successful');
    } catch (error) {
      console.error('Salesforce login failed:', error);
      throw new Error('Salesforce login failed');
    }
}

async function ensureConnection() {
    if (!conn.accessToken) {
      await loginToSalesforce();
    }
}

export async function createAccountAndContact(user: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}): Promise<{ accountId: string; contactId: string }> {
  await ensureConnection();

  const accountResult = await conn.sobject('Account').create({
    Name: `${user.firstName} ${user.lastName}`,
  });

  if (!accountResult.success) {
    throw new Error(`Account creation failed: ${accountResult.errors}`);
  }

  const accountId = accountResult.id;

  const contactResult = await conn.sobject('Contact').create({
    FirstName: user.firstName,
    LastName: user.lastName,
    Email: user.email,
    Phone: user.phone,
    AccountId: accountId,
  });

  if (!contactResult.success) {
    throw new Error(`Contact creation failed: ${contactResult.errors}`);
  }

  return { accountId, contactId: contactResult.id };
}