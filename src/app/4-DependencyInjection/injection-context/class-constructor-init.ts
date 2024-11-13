/*
The "injection context" in Angular refers to specific situations where Angular’s Dependency Injection (DI) system is
actively available, allowing the inject function to retrieve dependency instances. These injection contexts are
essentially specific places or moments when Angular is managing dependency resolution, like when constructing a class
 */

/*
1. Class Constructors and Initialization
When Angular creates an instance of a class, such as a component or service, the constructor runs in an injection
context. This allows dependencies to be injected directly through the constructor, and the inject function can also
be used inside the constructor or for field initializations.
 */

/*

@Injectable({
  providedIn: 'root',
})
class MyService {
  private service1: Service1;
  private service2: Service2 = inject(Service2); // Available in context

  constructor() {
    this.service1 = inject(Service1); // Available in context
  }
}

*/



