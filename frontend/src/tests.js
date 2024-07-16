// api.test.js


const API_BASE_URL = 'http://localhost:8000'; // Adjust based on your setup

describe('Django API Tests', () => {

  test('should import accounts', async () => {
    const formData = new FormData();
    formData.append('file', new Blob([`
      id,name,balance
      1,Account1,100.00
      2,Account2,200.00
    `], { type: 'text/csv' }), 'accounts.csv');

    const response = await fetch(`${API_BASE_URL}/import_accounts/`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    expect(data.status).toBe('success');
  });

  test('should list accounts', async () => {
    const response = await fetch(`${API_BASE_URL}/list_accounts/`);
    const data = await response.json();
    expect(data.accounts).toBeDefined();
    expect(Array.isArray(data.accounts)).toBe(true);
  });

  test('should get account by id', async () => {
    const response = await fetch(`${API_BASE_URL}/get_account/1/`);
    const data = await response.json();
    expect(data.status).toBe('success');
    expect(data.data).toHaveProperty('id', 1);
    expect(data.data).toHaveProperty('name');
    expect(data.data).toHaveProperty('balance');
  });

  test('should handle non-existent account', async () => {
    const response = await fetch(`${API_BASE_URL}/get_account/9999/`);
    const data = await response.json();
    expect(data.status).toBe('failed');
    expect(data.message).toBe('Account not found');
  });

  test('should transfer funds', async () => {
    const response = await fetch(`${API_BASE_URL}/transfer_funds/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from_account: 1,
        to_account: 2,
        amount: 50.00
      })
    });

    const data = await response.json();
    expect(data.status).toBe('success');
  });

  test('should handle insufficient funds during transfer', async () => {
    const response = await fetch(`${API_BASE_URL}/transfer_funds/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from_account: 1,
        to_account: 2,
        amount: 1000.00
      })
    });

    const data = await response.json();
    expect(data.status).toBe('failed');
    expect(data.message).toBe('Insufficient funds');
  });

  test('should handle transferring to the same account', async () => {
    const response = await fetch(`${API_BASE_URL}/transfer_funds/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from_account: 1,
        to_account: 1,
        amount: 10.00
      })
    });

    const data = await response.json();
    expect(data.status).toBe('failed');
    expect(data.message).toBe('Cannot transfer funds to the same account');
  });

  test('should handle invalid amount during transfer', async () => {
    const response = await fetch(`${API_BASE_URL}/transfer_funds/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from_account: 1,
        to_account: 2,
        amount: -10.00
      })
    });

    const data = await response.json();
    expect(data.status).toBe('failed');
    expect(data.message).toBe('Amount should be greater than 0');
  });

});

