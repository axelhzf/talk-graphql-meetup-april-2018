// @ts-check
// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Image,
  CodePane,
  Fit,
  Fill
} from 'spectacle';
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'spectacle-theme-nova/syntax/prism-javascript';
import 'spectacle-theme-nova/syntax/prism.nova.css';
import './style.css';
import createTheme from 'spectacle-theme-nova/bundle';
import jest from './images/jest.svg';

const theme = createTheme('avon');

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        theme={theme}
        progress="bar"
        transition={['fade']}
        transitionDuration={100}
      >
        <Slide bgColor="gray1">
          <Heading textColor="orange" size={2} textAlign="left">
            GraphQL
          </Heading>
          <Heading
            size={4}
            textColor="blue"
            textAlign="left"
            margin="40px 0 0 0"
          >
            Axel Hernández (@axelhzf)
          </Heading>
        </Slide>
        <Slide>
          <Heading1>What is graphQL?</Heading1>
          <List>
            <ListItem>
              GraphQL is a new API standard that provides a more efficient, powerful and flexible alternative to REST.
            </ListItem>
            <ListItem>
              GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data
            </ListItem>
            <ListItem>
              GraphQL is a query language designed to build client applications by providing an intuitive and flexible
              syntax and system for describing their data requirements and interactions.
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading1>Features</Heading1>
          <List>
            <ListItem>GraphQL enables declarative data fetching where a client can specify exactly what data it needs
              from an API</ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading1>History</Heading1>
          <List>
            <ListItem>Facebook started using GraphQL in 2012 in their native mobile apps</ListItem>
            <ListItem>The first time Facebook publicly spoke about GraphQL was at React.js Conf 2015 and shortly after
              announced their plans to open source it</ListItem>
            <ListItem>
              Interestingly, other companies like Netflix or Coursera were working on comparable ideas to make API
              interactions more efficient. Coursera envisioned a similar technology to let a client specify its data
              requirements and Netflix even open-sourced their solution called Falcor. After GraphQL was open-sourced,
              Coursera completely cancelled their own efforts and hopped on the GraphQL train.
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading>Who is using graphQL now?</Heading>
          <List>
            <ListItem>github</ListItem>
            <ListItem>intuit</ListItem>
            <ListItem>ibm</ListItem>
            <ListItem>http://graphql.org/users/</ListItem>
          </List>
        </Slide>
        <Slide bgColor="gray1">
          <Heading>graphQL hellow world</Heading>
          <GqlPane>
            {`
{
  me {
    name
  }
}
            `}
          </GqlPane>
          <JsonPane>
            {`
{
  "me": {
    "name": "Axel"
  }
}
            `}
          </JsonPane>
        </Slide>
        <Slide>
          <GqlPane>
            {`
{
  user(id: 123) {
    id
    name
  }
}
            `}
          </GqlPane>
        </Slide>
        <Slide>
          <GqlPane>
            {`
{
  me {
    name
    profilePicture {
      width
      height
      url
    }
  }
}
            `}
          </GqlPane>
        </Slide>

        <Slide>
          <GqlPane>
            {`
{
  me {
    name
    profilePicture(size: 500) {
      width
      height
      url
    }
  }
}
            `}
          </GqlPane>
        </Slide>
        <Slide>
          <GqlPane>
            {`
{
  me {
    name
    smallAvatar: profilePicture(size: 50) {
      width
      height
      url
    }
    bigAvatar: profilePicture(size: 500) {
      width
      height
      url
    }
  }
}
            `}
          </GqlPane>
        </Slide>

        <Slide>
          <GqlPane>
            {`
{
  shows {
    id
    title
    episodes {
      id
      overview
    }
  }
}
  `}
          </GqlPane>
          <JsonPane>
            {`
{
  "shows": [
    {
      "id": "",
      title: "",
      episodes: [
        { "id": "" }
        { "overview": ""}
      ]
    },
    { ... }
  }
}
            `}
          </JsonPane>

          Modelo mental, es realmente sencillo crear una query si sabes
          el formato que van a tener los datos que necesitas

        </Slide>

        <Slide>
          <GqlPane>
            {`
{
  shows {
    id
    title
    episodes {
      id
      overview
    }
  }
}
  `}
          </GqlPane>
        </Slide>

        <Slide>
          <GqlPane>{`
{
  shows(sort: trending) {
    id
    title
    episodes(limit: 1) {
      id
      overview
      torrents {
        url
      }
    }
  }
}
      `}</GqlPane>
        </Slide>
        <Slide>
          <Heading>GraphQL vs Rest</Heading>
        </Slide>
        <Slide>
          <Heading>No more over/under fetching</Heading>
          <div>
            This happens because the only way for a client to download data is by hitting endpoints that return fixed data structures. It’s very difficult to design the API in a way that it’s able to provide clients with their exact data needs.

            With GraphQL, the client can dictate the shape of the response objects returned by the API.

            Overfetching means the client is retrieving data that is actually not needed at the moment when it’s being fetched. It thus drains performance (more data needs longer to be downloaded and parsed) of the app and also exhausts the user’s data plan.


            A simple example for overfetching would be the following scenario: An app renders a profile screen for a user which displays the user’s name and birthday. The corresponding API endpoint that provides the information about specific users (.e.g /users/:id) is designed in a way that it also returns the address and billing information about each user. Both are useless for the profile screen and therefore fetching them is unnecessary.

            Underfetching is the opposite of overfetching and means that not enough data is included in an API response. This means the client needs to make additional API requests to satisfy its current data requirements.

            In the worst-case, underfetching results in the infamous N+1-requests problem. This describes a situation in which a client requires information about a list with n items. However, there is no endpoint that would satisfy the data requirements by itself. Instead, the client needs to make one request per element to gather the required information.


          </div>
        </Slide>
        <Slide>
          <Heading>Overfetching: Downloading superfluous data</Heading>
        </Slide>
        <Slide>
          <Heading>Underfetching and the n+1 problem</Heading>
        </Slide>

        <Slide>
          <Heading>GraphQL APIs have a strongly typed schema</Heading>

          One of the biggest problems with most APIs is that they’re lacking strong contracts for what their operations look like. Many developers have found themselves in situations where they needed to work with deprecated API documentation, lacking proper ways of knowing what operations are supported by an API and how to use them.

          A GraphQL schema is the backbone of every GraphQL API. It clearly defines the operations (queries, mutations and subscriptions) supported by the API, including input arguments and possible responses. The schema is an unfailing contract that specifies the capabilities of an API.

          GraphQL schemas are strongly-typed and can be written in the simple and expressive GraphQL Schema Definition Language (SDL). Thanks to the strong type-system, developers are getting many benefits that are unconceivable with schemaless APIs. As an example, build tooling can be leveraged to validate API requests and check for any errors that might occur in the communication with the API at compile-time. You might even get auto-completion for API operations in your editor!

          Another benefit of the schema is that developers don’t have to manually write API documentation any more — instead it can be auto-generated based on the schema that defines the API. That’s a game-changer for API development!


          Benefits of a Schema & Type System
          GraphQL uses a strong type system to define the capabilities of an API. All the types that are exposed in an API are written down in a schema using the GraphQL Schema Definition Language (SDL). This schema serves as the contract between the client and the server to define how a client can access the data.
          Once the schema is defined, the teams working on frontend and backends can do their work without further communication since they both are aware of the definite structure of the data that’s sent over the network.
          Frontend teams can easily test their applications by mocking the required data structures. Once the server is ready, the switch can be flipped for the client apps to load the data from the actual API.
        </Slide>

        <Slide>
          Ejemplo de definicion de typos
        </Slide>

        <Slide>
          <Heading>Instronspection</Heading>
          <div>Query that return the type definition</div>
        </Slide>

        <Slide>
          <Heading>Query validation: Validate the query before doing it</Heading>
        </Slide>

        <Slide>
          <Heading>Code generation: Given a query, we can generate types</Heading>
        </Slide>

        <Slide>
          <Heading>IDE Integration: Autocomplete and validation!</Heading>
        </Slide>

        <Slide>
          <Heading>Api documentation</Heading>
        </Slide>

        <Slide>
          <Heading>GraphQL enables rapid product development</Heading>

          <div>
            GraphQL makes frontend developers’ lives easy. Thanks to GraphQL client libraries (like Apollo, Relay or Urql) frontend developers are getting features like caching, realtime or optimistic UI updates basically for free

            The process of building a GraphQL API is vastly centered around the GraphQL schema. Hence, you’ll often hear the term schema-driven development in the context of GraphQL. It simply refers to a process where a feature is first defined in the schema, then implemented with resolver functions.

            Following this process and thanks to tools like GraphQL Faker, the frontend developers can be productive already once the schema was defined. GraphQL Faker mocks the entire GraphQL API (based on its schema definition), so frontend and backend teams can work completely independently.
          </div>

          <div>
            en frontend ya tenemos un montón de problemas
          </div>

          <div>
            Evolution de data fetching

            * using fetch
            * redux
            * apollo
          </div>
        </Slide>

        <Slide>
          <Heading>Data fetching evolution</Heading>
        </Slide>

        <Slide>
          <Heading>Fetch</Heading>
          <div>{`
                    fetch()
          .then(response => response.json)
          .then(todos => console.log(todos))
          `}</div>
        </Slide>

        <Slide>
          <Heading>Redux</Heading>
          <div>{`
          const fetchTodos = () => dispatch => {
          dispatch({ type: 'FETCH_TODOS_INIT' });
          api.fetchTodos()
          .then(todos => {
          dispatch({ type: 'FETCH_TODOS_SUCCESS', todos });
        })
          .catch(error => {
          dispatch({ type: 'FETCH_TODOS_ERROR', error });
        })
        }

          const todosReducer = (
          state = { loading: false, todos: [], error: null}
          action
          ) => {
          switch(action.type) {
          case 'FETCH_TODOS_INIT':
          return {...state, loading: true}
          case 'FETCH_TODOS_INIT_SUCCESS':
          return {...state, loading: false, todos: actions.todos}

          case 'FETCH_TODOS_INIT_ERROR':
          return {...state, loading: false, error: action.error}
        }
        }
          `}</div>
        </Slide>

        <Slide>
          <Heading>Apollo</Heading>

          {`
@graphql(gql\`
    query {
        todos {
            title
            date
        }
    }
\`)
class Todos extends Component {
    render() {
        const { data: { loading, todos }} = this.props;
        if (loading) return <div>Loading...</div>
        return (
            <ul>{todos.map(todo => <li>{todo.title}</li>)}
        )
    }
}
          `}
        </Slide>

        <Slide>
          <div>Benefits of using apollo</div>
          <ul>
            <li></li>
            <li>apollo-cache-persist</li>
          </ul>
        </Slide>

        <Slide>
          <div>Query composition via fragments</div>
        </Slide>

        <Slide>
          <Heading>My experience using graphql in production</Heading>
          <div>Experiencia con el mal performance de la aplicación</div>
        </Slide>

        <Slide>
          <Heading>Tools for rapid prototype</Heading>
        </Slide>

        <Slide>
          <Heading>PostGraphile</Heading>
          <div>
            Instant GraphQL API for PostgreSQL database


            https://www.graphile.org/postgraphile/
          </div>
        </Slide>

        <Slide>
         <Heading>Graphqcool / prisma</Heading>
         <div>
           https://github.com/graphcool/prisma
         </div>
        </Slide>

        <Slide>
          <Heading>AWS App Sync</Heading>
          <div>
            https://aws.amazon.com/appsync/
          </div>
        </Slide>

        <Slide>
          <div>
            edgedb?

            https://edgedb.com/blog/edgedb-a-new-beginning/
          </div>
        </Slide>


      </Deck>
    );
  }
}

const Heading1 = props => <Heading size={2} textColor="primary" {...props} />;

const JSPane = ({children}) => (
  <CodePane textSize="1.5rem" lang="javascript" source={children}/>
);

const GqlPane = ({children}) => (
  <CodePane textSize="1.5rem" lang="graphql" source={children}/>
);

const JsonPane = ({children}) => (
  <CodePane textSize="1.5rem" lang="json" source={children}/>
);


const Link = ({href, title}) => (
  <a href={href} target="_blank">
    {title || href}
  </a>
);
