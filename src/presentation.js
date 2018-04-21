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
  Fill,
  S
} from 'spectacle';
import createTheme from './theme/index';
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import './style.css';

const theme = createTheme();

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        theme={theme}
        progress="bar"
        transition={['fade']}
        transitionDuration={100}
      >
        <Slide
          bgColor="#171C22"
          bgImage={require('./images/graph-wash.png')}
        >
          <Heading size={2} textColor='white'>
            Connecting the dots with <S type="bold" textColor="pink">GraphQL</S>
          </Heading>
          <Image margin="40px auto 0 auto" height={200} src={require('./images/gql-logo.svg')} />
          <Text margin="40px 0 0 0" textColor='white'>
            Axel Hernández Ferrera (@axelhzf)
          </Text>
        </Slide>
        <Slide>
          <Heading size={2}>What is GraphQL?</Heading>
          <List>
            <ListItem>GraphQL is a query language for building APIs</ListItem>
            <ListItem>It provides an alternative to REST</ListItem>
            <ListItem>
              It allows clients to define the structure of the data required.
              They can get many resources in a single request.
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={2}>History</Heading>
          <List>
            <ListItem>
              2012 - Facebook started using GraphQL in their native mobile apps
            </ListItem>
            <ListItem>
              Jan 2015 - Facebook publicly spoke about GraphQL at React.js Conf
            </ListItem>
            <ListItem>Jul 2015 - Open Source (technical preview)</ListItem>
            <ListItem>Sep 2016 - Open Source (production ready)</ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3} >Other companies working on the same problem at the same time</Heading>
        </Slide>
        <Slide>
          <Heading>GraphQL Syntax</Heading>
        </Slide>
        <Slide bgColor="gray1">
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
          Modelo mental, es realmente sencillo crear una query si sabes el
          formato que van a tener los datos que necesitas
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
          <Heading>Overteching</Heading>
        </Slide>
        <Slide>
          <Image src={require('./images/catflix.png')} />
        </Slide>
        <Slide>
          <Heading size={2}>Overfetching</Heading>
          <div>/movies</div>
          <JSPane>
            {`
      [{
        "id": "tt2527336",
        "title": "Star Wars: The Last Jedi",
        "year": "2017",
        "synopsis": "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.",
        "trailer": "http://youtube.com/watch?v=Q0CbN8sfihY",
        "images": {
          "poster": "http://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
          "banner": "http://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
          "fanart": "http://image.tmdb.org/t/p/w500/oVdLj5JVqNWGY0LEhBfHUuMrvWJ.jpg"
        },
        "torrents": [
          { "lang": "en", "quality": "1080p", "url": "http://..." }
          { "lang": "en", "quality": "720p", "url": "http://..." }
        ]
      }
      ]
            `}
          </JSPane>
        </Slide>

        <Slide>
          <GqlPane>
            {`
{
  movies {
    id
    name
    images {
      poster
    }
  }
}
        `}
          </GqlPane>
        </Slide>

        <Slide>
          <Heading size={2}>Underfetching</Heading>
        </Slide>

        <Slide>
          <Heading size={2}>Getting last episode of liked shows</Heading>
          <List>
            <List>/user</List>
            <List>/shows/:id</List>
            <List>/shows/:id/episodes</List>
          </List>
        </Slide>

        <Slide>
          <GqlPane>{`
{
  user {
    likedShows {
      episodes(limit: 1) {
        id
        title
      }
    }
  }
}
          `}</GqlPane>
        </Slide>

        <Slide>
          <Heading>GraphQL APIs have a strongly typed schema</Heading>
        </Slide>

        <Slide>
          <GqlPane>
            {`
type Movie {
    id: String
    title: String!
    year: String!
    synopsis: String!
    trailer: String
    torrents: [Torrent!]
    images: Images
}

type Torrent {
    lang: String
    quality: String!
    url: String
}

            `}
          </GqlPane>
        </Slide>

        <Slide>
          <GqlPane>
            {`
type Query {
    movies(page: Int, sort: SortOptions, order: Int, keywords: String, genre: String) : [Movie]
    movie(id: String!): Movie
    shows(page: Int, sort: SortOptions, order: Int, keywords: String, genre: String): [Show]
    show(id: String!): Show
    status: Status
    devices: [Device]
}

type Mutation {
    playEpisode(showId: String!, season: Int!, episode: Int!): Episode!
    playMovie(id: String!): Movie!
}

schema {
    query: Query
    mutation: Mutation
}
  `}
          </GqlPane>
        </Slide>

        <Slide>
          <Heading size={2}>
            Instronspection: Query that return the type definition
          </Heading>
        </Slide>

        <Slide>
          <Heading size={2}>API documentation</Heading>
          <div>No more outdated swagger</div>
        </Slide>

        <Slide>
          <iframe src="http://graphql.org/swapi-graphql" />
        </Slide>

        <Slide>
          <Heading size={2}>
            Query validation: Validate the query before doing it
          </Heading>
          <img src={require('./images/query-validation.png')} />
        </Slide>

        <Slide>
          <Heading size={2}>IDE Integration</Heading>
          <img src={require('./images/ide-integration.gif')} />
        </Slide>

        <Slide>
          <Heading size={2}>Code generation</Heading>
          <List>
            <ListItem>
              <a href="https://github.com/apollographql/apollo-codegen">
                apollo-codegen
              </a>
            </ListItem>
            <ListItem>
              <a href="https://github.com/dotansimha/graphql-code-generator">
                graphql-code-generator
              </a>
            </ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={2}>Client side data fetching is a hard problem</Heading>
          <List>
            <ListItem>Caching</ListItem>
            <ListItem>Realtime</ListItem>
            <ListItem>Prefetching</ListItem>
            <ListItem>Optimistic UI</ListItem>
            <ListItem>Offline support</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading>Apollo</Heading>

          <JSPane>
            {`
const query = gql\`
  query {
      todos {
          title
          date
      }
  }
\`;
const Todos = () => (
  <Query query={query}>
    {(loading, error, data) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error...</div>
      return <ul>{data.todos.map(todo => <li>{todo.title}</li>)}</ul>
    }}
  </Query>
)
           `}
          </JSPane>
        </Slide>

        <Slide>
          <Heading size={2}>Query composition via fragments</Heading>
        </Slide>

        <Slide>
          <Heading size={2}>My experience using graphql</Heading>
        </Slide>

        <Slide>
          <Heading size={2}>Tools for rapid prototype</Heading>
          <List>
            <ListItem>
              <a href="https://www.graphile.org/postgraphile/">PostGraphile</a>
            </ListItem>
            <ListItem>
              <a href="https://github.com/graphcool/prisma">
                Graphqcool / prisma
              </a>
            </ListItem>
            <ListItem>
              <a href="https://aws.amazon.com/appsync/">AWS App Sync</a>
            </ListItem>
          </List>
        </Slide>
      </Deck>
    );
  }
}

const Heading1 = props => <Heading size={2} {...props} />;

const JSPane = ({ children }) => (
  <CodePane textSize="1.5rem" lang="javascript" source={children} />
);

const GqlPane = ({ children }) => (
  <CodePane textSize="1.5rem" lang="graphql" source={children} />
);

const JsonPane = ({ children }) => (
  <CodePane textSize="1.5rem" lang="json" source={children} />
);

const Link = ({ href, title }) => (
  <a href={href} target="_blank">
    {title || href}
  </a>
);
