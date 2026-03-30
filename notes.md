1.What is Jest ?
-> A testing framework used to write test cases , run tests , verify tests

2.What is Supertest ?
-> A library used to call backend API's , send HTTP requests ( POST, GET,etc ), get response i.e API Caller.

3.Rules -
1]describe() - used to organize related tests
example - describe("User API's", () =>{
//all user tests here
})

2]it() / test() - to write single test
example - it("should get users"), ()=>{
//test logic
}

test("GET /users should return users",async()=>{
//test logic
})

3]except() - Assertion i.e Used to verify result
Common matchers :
A.toBe() - exact value
B.toEqual() - object/array
C.toBeTruthy() - true

4]Async Testing - APIs are async use async/await
example -
test("GET /users should return users",async()=>{
const res=await request(app).get("/users"); //async API call
expect(res.statusCode).toBe(200);
expect(res.body).toEqual({name:"Nidhi});
})

5]beforeEach() - runs before every test
example - beforeEach(()=>{
//reset data
})

4.Basics of Supertest - call your API endpoints and verify the response.
1]request(app) - start api call i.e connects to your express app
example - request(app)

2]HTTP Method - Used to call API's
example -
A.request(app).get("/users") //fetch
B.request(app).post("/users") //create
C.request(app).put("/users/1") //update
D.request(app).delete("/users/1") //delete

3]send() - Send data , used in POST/PUT
example - request(app).post("/users").send({name:"Nidhi"});

4]set() - Headers (Auth) , used for token
example - request(app).get("/profile").set"Authorization","Bearer token");

5]Data Validation
example - expect(res.body.naame).toBe("Nidhi");

6]Success Case
example - expect(res.statusCode).toBe(200);

7]Error Case
example - expect(res.statusCode).toBe(400);

5.Intermediate Concepts -
1]Multiple Inputs - Run same test logic with different input values .
example -
test.each([
[{name:"Nidhi},201],
[{name:""},400],
[{ },400],
])("POST /users with %p returns %i",async=>{
const res=await request(app).post("/users").send(data);
expect(res.statusCode).toBe(status);
} )
{name:"Nidhi},201 - format of (data,status)

NOTE :
A.%p means pretty print , prints actual value of the parameter  
B.%i means index of test case (0-based) in test.each , Shows which row number is being executed

2]Integration Testing - It checks if different parts of your application work togther correctly i.e API + Database
example - test("Create user and fetch from DB",async()=>{
//1.create user
await request(app).post("/users").send({name:"Nidhi});

    //2.fetch users
    const res=await request(app).get("/users");

    //3. validate response
    expect(res.statusCode).toBe(200);
    except(res.body).toEqual(
        expect.arrayContaining([{name:"Nidhi"}])
    )

});


6.React Library Testing & Jest 
-Mostly developer performs Unit and Integration Testing 
-Internally installed 2 libraries 
1]'render()' is used to render react component.
example - 

test('renders learn react link',()=>{
    render{<App/>};//its is required 
    const element=screen.getByText("learn react");
    expect(element).toBeInTheDocument();
})

-getByTitle() is used to match given text with title of tag i.e title of <img/>
-getByRole() is used to match given element type with type of element i.e textbox 
-getByPlaceholderText() is used to match given text with placeholder of element 
-expect().toHaveAttribute(attribute,value); is used to check attribute is present with specified value 

2]describe() is used to group related test cases to together for execution and 'ONLY' & 'SKIP' are attributes of it . i.e describe.skip 
example - 
describe("UI test case group",()=>{
    //test case 1 

    //test case 2
})

3]Testing with events
-Includes Onchange event , click event 

4]beforeAll, beforeEach , AfterAll and afterEach

5]getByTestId("btn1") - used in RTL to select an element using data-testid attribute 
example - 
<button data-testid="btn1">Click Me</button>

6]We can find single and multiple elements using RTL queries i.getBy(single) and getAllBy(multiple)

7]Assertion methods - 
1.toBeInTheDocument() - to check in the document 
2.toHaveValue()
3.toBeEnabled()
4.toBeDisabled() 
5.toHaveAttribute()
6.toHaveClass() 

9]API Testing -
-Mostly we test rest api by mocking i.e MSW stands for MOCK SERVICE WORKER also we can mock apis with jest but option - 1 is recommended . 
https://chatgpt.com/share/69ca5825-9ef0-83e8-9265-7ce1ef4044d9
