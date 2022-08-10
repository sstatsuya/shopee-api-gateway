import { gql } from "@apollo/client";

export const query = gql`
  query Query(
    $token: String
    $name: String
    $type: String
    $variables: JSONObject
  ) {
    request(token: $token, name: $name, type: $type, variables: $variables) {
      data
    }
  }
`;
