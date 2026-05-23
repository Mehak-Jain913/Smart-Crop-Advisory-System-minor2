import { gql } from '@apollo/client';

export const GET_WEATHER = gql`
  query GetWeather($location: String!) {
    weather(location: $location) {
      temperature
      humidity
      rainfall
      windSpeed
    }
  }
`;
