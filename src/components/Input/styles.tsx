import styled from 'styled-components/native';

export const Container = styled.View<{ hasExtra: boolean; error: string }>`
  width: 100%;
  height: 55px;
  flex-direction: ${props => (props.hasExtra ? 'row' : 'column')};
  border: 2px solid ${props => (props.error ? '#FF4034' : '#FFF')};
  padding: 0 16px;
  justify-content: ${props => (props.hasExtra ? 'space-between' : 'center')};
  align-items: ${props => (props.hasExtra ? 'center' : 'stretch')};
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const TextInput = styled.TextInput<{ hasExtra: boolean }>`
  width: 100%;
  height: 100%;
  max-width: ${props => (props.hasExtra ? '95%' : '100%')};
  color: #666;
  font-family: 'Roboto_400Regular';
  font-size: 16px;
`;
