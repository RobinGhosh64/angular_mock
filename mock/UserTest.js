import { User } from '../models/user';
describe('User', () => {
  
  let user = null;

  /**
  * beforeEach will create fresh copy of User object
  * before each unit test. We also can define User object once 
  * and run unit tests against it, but in general it's a good practice
  * to work on a new instance of an object to avoid modifications from
  * the previous test run.
  */
  beforeEach(() => {
    user = new User('john@doe', 'johnspassword');
  });

  it('should be initialized', () => {
    expect(user).toBeTruthy();
  });
  it('should be serialized to Json properly', () => {
    const jsonPropertiesActual = Object.keys(user.toJson());
    const jsonPropertiesExpected = [
      'email',
      'password'
    ];
    expect(jsonPropertiesActual).toEqual(jsonPropertiesExpected);
  });
});

