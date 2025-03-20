const request = require('supertest');
const app = require('./app');
const { v4: uuidv4 } = require('uuid');

describe('Receipt Processor API', () => {
  it('should process a receipt and return an ID', async () => {
    const response = await request(app)
      .post('/receipts/process')
      .send({
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [
          { shortDescription: 'Mountain Dew 12PK', price: '6.49' },
          { shortDescription: 'Emils Cheese Pizza', price: '12.25' }
        ],
        total: '35.35'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should return points for a given receipt ID', async () => {
    const processResponse = await request(app)
      .post('/receipts/process')
      .send({
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [
          { shortDescription: "Mountain Dew 12PK", price: "6.49" },
          { shortDescription: "Emils Cheese Pizza", price: "12.25" },
          { shortDescription: "Knorr Creamy Chicken", price: "1.26" },
          { shortDescription: "Doritos Nacho Cheese", price: "3.35" },
          { shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ", price: "12.00" }
        ],
        total: "35.35"
      });

    expect(processResponse.statusCode).toBe(200);
    expect(processResponse.body).toHaveProperty('id');

    const receiptId = processResponse.body.id;

    const pointsResponse = await request(app).get(`/receipts/${receiptId}/points`);

    expect(pointsResponse.statusCode).toBe(200);
    expect(pointsResponse.body).toHaveProperty('points');
  });

  // --- NEGATIVE TEST CASES ---

  it('should return 400 for missing fields in receipt processing', async () => {
    const response = await request(app)
      .post('/receipts/process')
      .send({ 
        retailer: 'Target', 
        total: '35.35' // Missing other required fields
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 400 for invalid data types in receipt processing', async () => {
    const response = await request(app)
      .post('/receipts/process')
      .send({
        retailer: 12345, // Invalid type, should be string
        purchaseDate: 'Invalid Date', // Invalid format
        purchaseTime: '99:99', // Invalid time format
        items: "Not an array", // Should be an array
        total: "NaN" // Should be a number string
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 404 for non-existent receipt ID when fetching points', async () => {
    const pointsResponse = await request(app).get('/receipts/nonExistentID/points');
    
    expect(pointsResponse.statusCode).toBe(404);
    expect(pointsResponse.body).toHaveProperty('error');
  });

  it('should return a valid UUID as receipt ID', async () => {
    const response = await request(app)
      .post('/receipts/process')
      .send({
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [
          { shortDescription: 'Mountain Dew 12PK', price: '6.49' },
          { shortDescription: 'Emils Cheese Pizza', price: '12.25' }
        ],
        total: '35.35'
      });
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  
    const receiptId = response.body.id;
  
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    expect(receiptId).toMatch(uuidRegex);
  });
  });

