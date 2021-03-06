import React from "react";
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { Link } from "react-router";


class WordsTable extends React.Component {
  render() {
    const { data: { words } } = this.props;

    if (words) {
      return (
        <table className="table">
          <thead>
          <tr>
            <th>#</th>
            <th>Слово</th>
            <th>Значения</th>
          </tr>
          </thead>
          <tbody>
          {
            words.map((word) => {
              return(
                <tr key={ word.id }>
                  <td><Link to={ `/words/${ word.id }` }>{ word.id }</Link></td>
                  <td>{ word.name }</td>
                  <td>
                    {
                      word.descriptions.map((desc, i) => (<p key={i}>{ desc }</p>))
                    }
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      )
    }
    else {
      return <div>...</div>
    }
  }
}

const query = gql`
  query {
    words {
      id,
      name,
      descriptions
    }
  }
`;

export default graphql(query)(WordsTable);
