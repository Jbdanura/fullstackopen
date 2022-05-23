describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        "username": "jotabe",
        "name": "master",
        "password": "juanba"
      }
      cy.request("POST","http://localhost:3003/api/users", user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      // ...
      cy.contains("Username")
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() { 
          // ..
          cy.get("#username").type("jotabe")
          cy.get("#password").type("juanba")
          cy.get("#submit-login").click()
          cy.contains("Succesfully logged in!")
        })
    
        it('fails with wrong credentials', function() {
            cy.get("#username").type("jotabe")
            cy.get("#password").type("juanbass")
            cy.get("#submit-login").click()
            cy.contains("Wrong credentials")
          // ...
        })
      })

    describe('When logged in', function() {
        beforeEach(function() {
          // log in user here
          cy.get("#username").type("jotabe")
          cy.get("#password").type("juanba")
          cy.get("#submit-login").click()
          cy.get("#new-blog-btn").click()
          cy.get("#title").type("testing with cypress")
          cy.get("#author").type("me")
          cy.get("#url").type("www.wachuwant.com")
          cy.get("#submit-blog").click()
        })
    
        it('A blog can be created', function() {
            cy.contains("testing with cypress")
          // ...
        })
        it("A blog can be liked",function(){
            cy.get("#view-blog").click()
            cy.get("#like-blog").click()
            cy.contains("likes 1")
        })
        it("A blog can be removed",function(){
            cy.get("#view-blog").click()
            cy.get("#remove-blog").click()
            cy.get("testing with cypress").should("not.exist")
        })
        it("Blogs are ordered by likes",function(){
            cy.get("#new-blog-btn").click()
            cy.get("#title").type("tu mama")
            cy.get("#author").type("you")
            cy.get("#url").type("www.fafafafa.com")
            cy.get("#submit-blog").click()
            cy.get("#new-blog-btn").click()
            cy.get("#title").type("lmao")
            cy.get("#author").type("xd")
            cy.get("#url").type("www.lul.com")
            cy.get("#submit-blog").click()
            cy.get(".blog").eq(0).get("#view-blog").click().get("#like-blog").click()
            cy.get(".blog").first().should("contain","testing with cypress")
        })
      })
  })