import React from 'react';

import {
  Container, Header, HeaderTitle, InputContainer, Input,
} from './styles';

const Dashboard: React.FC = () => (
  <Container>
    <Header>
      <HeaderTitle>Covid Tracker</HeaderTitle>
      <InputContainer>
        <Input placeholder="Busque por uma localização" />
      </InputContainer>
    </Header>
  </Container>
);

export default Dashboard;
