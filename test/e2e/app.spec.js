const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
  let httpServer = null;
  let pageObject = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach((done) => {
    pageObject = nightmare.goto(url);
    done();
  });

  after((done) => {
    httpServer.close();
    done();
  });

  it('should contain a <h1> element for the page title', () => {
    return pageObject
      .evaluate(() => document.querySelector('h1').innerText)
      .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal('Mortgage Calculator');
      });
  });

  it('should contain an input principal element', () => {
    return pageObject
      .evaluate(() => document.querySelector('input[name="principal"]'))
      .then((principalInput)=> {
        expect(principalInput).to.not.be.null;
        expect(principalInput).to.exist;
      });
  });

  it('should contain an input interest rate element', () => {
    return pageObject
      .evaluate(() => document.querySelector('input[name="interestRate"]'))
      .then((interestInput) => {
        expect(interestInput).to.not.be.null;
        expect(interestInput).to.exist;
      });
  });

  it('should contain an input loan term element', () => {
    return pageObject
      .evaluate(() => document.querySelector('input[name="loanTerm"]'))
      .then((loantermInput) => {
        expect(loantermInput).to.not.be.null;
        expect(loantermInput).to.exist;
      });
  });

  it('should correctly calculate mortgage', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 300000)
      .type('input[name=interestRate]', 3.75)
      .type('input[name=loanTerm', 30)
      .select('select[name=period]', 12)
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then((outputText) => {
        expect(outputText).to.equal('$1389.35');
      })
  ).timeout(6500);

})
