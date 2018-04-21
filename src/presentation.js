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
  Layout,
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
      <Deck theme={theme} progress="bar" transition={[]} transitionDuration={0}>
        <Slide bgColor="#171C22" bgImage={require('./images/graph-wash.png')}>
          <Heading size={2} textColor="white">
            Connecting the dots with{' '}
            <S type="bold" textColor="pink">
              GraphQL
            </S>
          </Heading>
          <Image
            margin="40px auto 0 auto"
            height={200}
            src={require('./images/gql-logo.svg')}
          />
          <Text margin="40px 0 0 0" textColor="white">
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
          <Heading size={3}>
            Other companies working on the same problem at the same time
          </Heading>
        </Slide>
        <Slide>
          <Heading>GraphQL Syntax</Heading>
        </Slide>
        <Slide bgColor="bgCode">
          <GqlCode>
            {`
{
  me {
    name
  }
}
            `}
          </GqlCode>
        </Slide>
        <Slide bgColor="bgCode">
          <Layout>
            <Fill>
              <GqlCode>
                {`
{
  me {
    name
  }
}
            `}
              </GqlCode>
            </Fill>
            <Fill>
              <JsonCode>
                {`
{
  "me": {
    "name": "Axel"
  }
}
            `}
              </JsonCode>
            </Fill>
          </Layout>
        </Slide>
        <Slide bgColor="bgCode">
          <GqlCode>
            {`
{
  user(id: 123) {
    id
    name
  }
}
            `}
          </GqlCode>
        </Slide>
        <Slide bgColor="bgCode">
          <GqlCode>
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
          </GqlCode>
        </Slide>

        <Slide bgColor="bgCode">
          <GqlCode>
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
          </GqlCode>
        </Slide>
        <Slide bgColor="bgCode">
          <GqlCode>
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
          </GqlCode>
        </Slide>

        <Slide bgColor="bgCode">
          <Layout>
            <Fill>
              <GqlCode>
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
              </GqlCode>
            </Fill>
            <Fill>
              <JsonCode>
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
              </JsonCode>
            </Fill>
          </Layout>
        </Slide>

        <Slide bgColor="bgCode">
          <GqlCode>
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
          </GqlCode>
        </Slide>

        <Slide bgColor="bgCode">
          <GqlCode>{`
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
      `}</GqlCode>
        </Slide>
        <Slide>
          <Heading>GraphQL vs Rest</Heading>
        </Slide>
        <Slide>
          <Heading>Overteching</Heading>
        </Slide>
        <Slide>
          <Layout>
            <Fill>
              <Image
                src={require('./images/catflix.png')}
                style={{ maxHeight: '39rem' }}
              />
            </Fill>
          </Layout>
        </Slide>
        <Slide bgColor="bgCode">
          <JsCode textSize={16}>
            {`
      // /movies
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
      }]
            `}
          </JsCode>
        </Slide>

        <Slide bgColor="bgCode">
          <GqlCode>
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
          </GqlCode>
        </Slide>

        <Slide>
          <Heading size={2}>Underfetching</Heading>
        </Slide>

        <Slide>
          <Heading size={2} textAlign="left">
            Use case
          </Heading>
          <Heading fit>Getting the last episode of user liked shows</Heading>
        </Slide>

        <Slide bgColor="bgCode">
          <JsCode>
            {`
            /user
            /shows/:id
            /shows/:id/episodes
        `}
          </JsCode>
        </Slide>

        <Slide bgColor="bgCode">
          <GqlCode>{`
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
          `}</GqlCode>
        </Slide>

        <Slide>
          <Heading fit>GraphQL APIs have a strongly typed schema</Heading>
        </Slide>

        <Slide bgColor="bgCode">
          <GqlCode>
            {`
type Movie {
    id: String!
    title: String!
    year: String!
    synopsis: String!
    trailer: String
    torrents: [Torrent!]!
    images: Images!
}

type Torrent {
    url: String!
    lang: String
    quality: String
}

            `}
          </GqlCode>
        </Slide>

        <Slide bgColor="bgCode">
          <GqlCode>
            {`
type Query {
    movies(sort: SortOptions, search: String) : [Movie!]!
    movie(id: String!): Movie
    shows(sort: SortOptions, search: String): [Show!]!
    show(id: String!): Show
}

type Mutation {
    playEpisode(id: String!): Episode!
    playMovie(id: String!): Movie!
}

schema {
    query: Query
    mutation: Mutation
}
  `}
          </GqlCode>
        </Slide>

        <Slide>
          <Heading size={2}>Instronspection</Heading>
          <Heading size={5}>Query that return the type definition</Heading>
        </Slide>

        <Slide>
          <Heading size={2}>API documentation</Heading>
          <Heading size={5}>No more outdated swagger</Heading>
        </Slide>

        <Slide>
          <iframe
            src="http://graphql.org/swapi-graphql"
          />
        </Slide>

        <Slide>
          <Heading size={2}>Query validation</Heading>
          <Image src={require('./images/query-validation.png')} margin="40px auto"/>
        </Slide>

        <Slide>
          <Heading size={2}>IDE Integration</Heading>
          <Image src={require('./images/ide-integration.gif')} margin="40px auto"/>
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
          <Heading size={2} fit>
            Client side data fetching is a hard problem
          </Heading>
          <List>
            <ListItem>Caching</ListItem>
            <ListItem>Realtime</ListItem>
            <ListItem>Prefetching</ListItem>
            <ListItem>Optimistic UI</ListItem>
            <ListItem>Offline support</ListItem>
          </List>
        </Slide>

        <Slide bgColor="bgCode">
          <JsCode>
            {`const query = gql\`
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
      return <ul>{data.todos.map(todo =>
        <li>{todo.title}</li>
      )}</ul>
    }}
  </Query>
)
           `}
          </JsCode>
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
                graphcool / prisma
              </a>
            </ListItem>
            <ListItem>
              <a href="https://aws.amazon.com/appsync/">AWS App Sync</a>
            </ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading>Thanks</Heading>
        </Slide>
      </Deck>
    );
  }
}

const JsCode = ({ children, ...other }) => (
  <CodePane lang="javascript" source={children} {...other} />
);

const GqlCode = ({ children }) => <CodePane lang="graphql" source={children} />;

const JsonCode = ({ children }) => <CodePane lang="json" source={children} />;

const Link = ({ href, title }) => (
  <a href={href} target="_blank">
    {title || href}
  </a>
);
