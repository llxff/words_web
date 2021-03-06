import React from "react"
import { Link } from "react-router"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import Word from "../../components/words/show"

class ShowWordView extends React.Component {
  render() {
    const { data: { word_web, error } } = this.props;

    if(word_web) {
      return <Word word_web={ word_web } />
    }
    else if(error) {
      return <div>{ error.graphQLErrors[0].message }</div>
    }
    else {
      return <div>Loading...</div>
    }
  }
}

const query = gql`
  query GetWordWeb($id: Int!) {
    word_web(id: $id) {
      word {
        id,
        name,
        descriptions
      },
      associations {
        subject {
          id,
          name
        },
        examples {
          id,
          name
        }
      },
      synonyms {
        subject {
          id,
          name
        },
        examples {
          id,
          name
        }
      },
      antonyms {
        subject {
          id,
          name
        },
        examples {
          id,
          name
        }
      },
      idioms {
        id,
        name,
        descriptions
      }
    }
  }
`;

const queryOptions = ({ params: { id }}) => {
  return { variables: { id: +id }};
};

export default graphql(query, { options: queryOptions })(ShowWordView);
