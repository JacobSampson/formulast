import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

export interface HeaderProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: 150;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  letter-spacing: 0.25em;

  svg {
    margin-right: 0.5em;
  }

  ::after {
    content: '';
    width: 3em;
    height: 1em;
    display: block;
    position: absolute;
    bottom: 0.25em;
    right: -0.5em;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }
`;

const Bar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5em solid ${({ theme }) => theme.palette.primary.main};
  padding: 0 1em;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > *:not(:last-of-type) {
      margin-right: 1em;
  }
`;

const Container = styled.header`
  @media screen and (max-width: ${({ theme }) => theme.screen.small}) {
  }
`;

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount
}) => (
  <Container>
    <Bar>
      <Title>
        <svg xmlns="http://www.w3.org/2000/svg" width="50.402" height="60.253" viewBox="0 0 50.402 60.253">
          <g id="Group_12" data-name="Group 12" transform="translate(0)">
            <g id="Group_10" data-name="Group 10" transform="translate(0 0)">
              <g id="Group_9" data-name="Group 9" transform="translate(0 0)">
                <rect id="Rectangle_175" data-name="Rectangle 175" width="33.06" height="45.991" transform="matrix(0.921, 0.391, -0.391, 0.921, 19.97, 5)" fill="#463355" opacity="0.11"/>
                <rect id="Rectangle_182" data-name="Rectangle 182" width="33.06" height="45.991" transform="matrix(0.921, 0.391, -0.391, 0.921, 17.97, 0)" fill="#62a87c"/>
                <g id="Group_8" data-name="Group 8" transform="matrix(0.966, 0.259, -0.259, 0.966, 14.074, 8.553)">
                  <path id="Path_7" data-name="Path 7" d="M0,6.77S-.044-1.329,8.087.19L7.554,3S3.91.834,3.2,6.77Z" transform="matrix(-0.995, -0.105, 0.105, -0.995, 8.043, 33.728)" fill="#62a87c"/>
                  <g id="Group_6" data-name="Group 6" transform="translate(4.456 0)">
                    <path id="Path_5" data-name="Path 5" d="M5.664,0,0,27.1H3.289L9.018,0Z" transform="translate(10.17 2.013)" fill="#62a87c"/>
                    <path id="Path_8" data-name="Path 8" d="M0,6.77S-.044-1.329,8.087.19L7.554,3S3.91.834,3.2,6.77Z" transform="matrix(-0.995, -0.105, 0.105, -0.995, 13.106, 34.204)" fill="#62a87c"/>
                    <path id="Path_15" data-name="Path 15" d="M12.144,3.039a3.928,3.928,0,0,0-1.729-.376A2.111,2.111,0,0,0,8.763,3.3,4.21,4.21,0,0,0,7.905,5.27L7.487,7.194h3.3L10.22,9.787H6.874L3.36,26.211H0L3.527,9.787H1.087l.572-2.593H4.085L4.6,4.852A6.241,6.241,0,0,1,6.623,1.164,5.954,5.954,0,0,1,10.443,0a6.864,6.864,0,0,1,2.231.335Z" transform="translate(0 0)" fill="#fff"/>
                  </g>
                </g>
                <g id="Group_7" data-name="Group 7" transform="matrix(0.966, 0.259, -0.259, 0.966, 17.17, 11.149)">
                  <path id="Path_7-2" data-name="Path 7" d="M0,5.182A6.242,6.242,0,0,1,3.64.007s.292-.431-.419,5.505Z" transform="matrix(-0.995, -0.105, 0.105, -0.995, 3.679, 29.328)" fill="#fff"/>
                  <g id="Component_2_1" data-name="Component 2 – 1" transform="translate(11.873 0)">
                    <path id="Path_5-2" data-name="Path 5" d="M151.661,395.537h3.289l5.015-25.782c-1-.431-3.148.914-4.13,3.581Z" transform="translate(-150.599 -369.676)" fill="#fff"/>
                    <path id="Path_8-2" data-name="Path 8" d="M3.259,6.007A48.436,48.436,0,0,0,3.781,0S.774.127,0,5.822Z" transform="matrix(-0.995, -0.105, 0.105, -0.995, 3.76, 31.706)" fill="#fff"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
        FORMULAST
      </Title>
      <Buttons>
        {user ? (
          <Button size='medium' onClick={onLogout} square label="log out" />
        ) : (
          <>
            <Button size='medium' label='log in' square active={false} />
            <Button size='medium' label='create account' square />
          </>
        )}
      </Buttons>
    </Bar>


  </Container>
);
