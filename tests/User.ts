import  { expect } from 'chai';
import request from 'request';
const TESTING_REGISTER_URL = 'http://localhost:8080/api/register';
const TESTING_LOGIN_URL = 'http://localhost:8080/api/login'
describe('User API', () => {
  describe('CREATE USER', () => {
    describe('Create user validation ERROR', () => {
      describe('Create user missing field', () => {
        const payload = {
          email: "abc@gamil.com",
          password: "12345678",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user missing password field', () => {
        const payload = {
          username: "",
          email: "abc@gamil.com",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user missing email field', () => {
        const payload = {
          username: "abc",
          password: "12345678",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user empty username field', () => {
        const payload = {
          username: "",
          email: "abc@gmail.com",
          password: "12345678",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user empty password field', () => {
        const payload = {
          username: "abc",
          email: "abc@gmail.com",
          password: "",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user empty email field', () => {
        const payload = {
          username: "abc",
          email: "",
          password: "12345678",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user invalid email field', () => {
        const payload = {
          username: "abcd",
          email: "abc@.com",
          password: "12345678",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user invalid email field', () => {
        const payload = {
          username: "abcd",
          email: 172683,
          password: "12345678",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user invalid username field', () => {
        const payload = {
          username: 1256,
          email: "abc@.com",
          password: "12345678",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user invalid username field', () => {
        const payload = {
          username: "_______",
          email: "abc@.com",
          password: "12345678",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user invalid password field', () => {
        const payload = {
          username: "abcd",
          email: "abc@.com",
          password: 12345678,
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user invalid username length', () => {
        const payload = {
          username: "akbcnkdbcjrlbsjlhdbcjlhs",
          email: "abc@gmail.com",
          password: "12345678",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user invalid username length', () => {
        const payload = {
          username: "ab",
          email: "abc@gmail.com",
          password: "12345678",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user invalid password length', () => {
        const payload = {
          username: "abc",
          email: "abc@gmail.com",
          password: "adbcklbclbsljcbwrlyblchsdblcjhbdjhc",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user invalid password length', () => {
        const payload = {
          username: "abc",
          email: "abc@gmail.com",
          password: "abcd",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })

      describe('Create user duplicate', () => {
        const payload = {
          username: "abcd",
          email: "piyush@gamil.com",
          password: "johndoe",
        }
  
        it('Status', done => {
          request.post(`${TESTING_REGISTER_URL}`, {
            json: payload
          }, (_, response) => {
            expect(response.statusCode).to.equal(400)
            done()
          })
        })
      })
    })

    // it('Create user SUCCESS', done => {
    //   request.post(`${TESTING_REGISTER_URL}/user`, {
    //     json: {
    //       username: "abc",
    //       email: "abc@gamil.com",
    //       password: "johndoe",
    //     }
    //   }, (_, response) => {
    //     expect(response.statusCode).to.equal(200)
    //     done()
    //   })
    // })
  })

  describe('Login User', () => {
    describe('Login user missing email field', () => {
      const payload = {
        password: "12345678",
      }

      it('Status', done => {
        request.post(`${TESTING_LOGIN_URL}`, {
          json: payload
        }, (_, response) => {
          expect(response.statusCode).to.equal(400)
          done()
        })
      })
    })

    describe('Login user missing password field', () => {
      const payload = {
        email: "abc@gamil.com",
      }

      it('Status', done => {
        request.post(`${TESTING_LOGIN_URL}`, {
          json: payload
        }, (_, response) => {
          expect(response.statusCode).to.equal(400)
          done()
        })
      })
    })

    describe('Login user empty email field', () => {
      const payload = {
        email: "",
        password: "12345678",
      }

      it('Status', done => {
        request.post(`${TESTING_LOGIN_URL}`, {
          json: payload
        }, (_, response) => {
          expect(response.statusCode).to.equal(400)
          done()
        })
      })
    })

    describe('Login user empty password field', () => {
      const payload = {
        email: "abc@gamil.com",
        password: "",
      }

      it('Status', done => {
        request.post(`${TESTING_LOGIN_URL}`, {
          json: payload
        }, (_, response) => {
          expect(response.statusCode).to.equal(400)
          done()
        })
      })
    })

    describe('Login user invalid password field', () => {
      const payload = {
        email: "abc@gamil.com",
        password: "kabdcldbciulb;kcjdbkcdbkdb;kjcdk",
      }

      it('Status', done => {
        request.post(`${TESTING_LOGIN_URL}`, {
          json: payload
        }, (_, response) => {
          expect(response.statusCode).to.equal(400)
          done()
        })
      })
    })

    describe('Login user invalid password field', () => {
      const payload = {
        email: "abc@gamil.com",
        password: 12345,
      }

      it('Status', done => {
        request.post(`${TESTING_LOGIN_URL}`, {
          json: payload
        }, (_, response) => {
          expect(response.statusCode).to.equal(400)
          done()
        })
      })
    })

    describe('Login user invalid email field', () => {
      const payload = {
        email: "abcgamil.com",
        password: "",
      }

      it('Status', done => {
        request.post(`${TESTING_LOGIN_URL}`, {
          json: payload
        }, (_, response) => {
          expect(response.statusCode).to.equal(400)
          done()
        })
      })
    })

  })
});