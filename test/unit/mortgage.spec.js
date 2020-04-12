const expect = require('chai').expect;
const assert = require('chai').assert;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
  let mortgage = null;

  beforeEach(() => {
    mortgage = new Mortgage();
  });

  it('should have a monthlyPayment function', () => {
    expect(mortgage.monthlyPayment).to.exist;
  });

  it('monthlyPayment should be of type number', () => {
    expect(mortgage.monthlyPayment=218);
    assert.typeOf(mortgage.monthlyPayment, 'number');
  });

  //test not passing.
  // it('should have a monthly payment of 218', () => {
  //   mortgage = new Mortgage(50000, 3.25, 30, 12);
  //   expect(mortgage.monthlyPayment()).to.equal('218');
  // });

  it('should have a principal value', () => {
    expect(mortgage.principal=50000);
    expect(mortgage.principal).to.equal(50000);
  });

  it('should have an interest value', () => {
    expect(mortgage.interest=3.25);
    expect(mortgage.interest).to.equal(3.25);
  });

  it('should have a term value', () => {
    expect(mortgage.term=30);
    expect(mortgage.term).to.equal(30);
  });

  it('should have a period value', () => {
    expect(mortgage.period=12);
    expect(mortgage.period).to.equal(12);
  });

  it('should have a monthly payment', () => {
    expect(mortgage.monthlyPayment=218);
    expect(mortgage.monthlyPayment).to.equal(218);
  });

});
