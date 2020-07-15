import React from 'react';

import { useAuth } from '../../hooks/auth';

import { Container, Title, RightSide, AvatarButton, Avatar } from './styles';

interface DashboardHeaderProps {
  user: {
    full_name: string;
    email: string;
    avatar_url: string;
  };
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  const { full_name, email, avatar_url } = user;
  const { signOut } = useAuth();

  const placeholderAvatar = `https://api.adorable.io/avatars/400/${email}.png`;

  return (
    <Container>
      <Title>{full_name}</Title>
      <RightSide>
        <AvatarButton onPress={signOut}>
          <Avatar
            source={{
              uri: avatar_url || placeholderAvatar,
            }}
          />
        </AvatarButton>
      </RightSide>
    </Container>
  );
};

export default DashboardHeader;
