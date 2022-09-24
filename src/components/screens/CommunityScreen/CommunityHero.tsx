import React from 'react';
import { SectionLede, styles, MailingListSignup } from '@storybook/components-marketing';
import { styled } from '@storybook/theming';
import { Community } from '../../layout/Community';
import { Stat } from '../../basics/Stat';
import { NpmDownloadCount } from '../../layout/NpmDownloadCount';

const { pageMargins, breakpoints, color } = styles;

const Wrapper = styled.header`
  margin-top: 4rem;
  margin-bottom: 3rem;
`;

const StyledCommunity = styled(Community)`
  padding-top: 4rem;
  padding-bottom: 3rem;

  @media (min-width: ${breakpoints[1]}px) {
    padding-bottom: 3rem;
  }

  @media (min-width: ${breakpoints[2]}px) {
    padding-bottom: 3rem;
  }
`;

const Stats = styled.div`
  ${pageMargins}
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

const DividerWrapper = styled.div`
  ${pageMargins};
`;
const Divider = styled.hr`
  margin-top: 3rem;
  border: 0;
  border-bottom: 1px solid ${color.border};
`;

interface CommunityHeroProps {
  npmDownloads: number;
  twitterFollowerCount: number;
  discordMemberCount: number;
  githubContributorCount: number;
  youTubeSubscriberCount: number;
  githubStars: number;
}

export function CommunityHero({
  npmDownloads,
  twitterFollowerCount,
  discordMemberCount,
  githubContributorCount,
  githubStars,
  youTubeSubscriberCount,
  ...props
}: CommunityHeroProps) {
  return (
    <Wrapper {...props}>
      <SectionLede
        heading="Meet world-class frontend devs"
        headingWrapper="h1"
        copy="Storybook is the one of the fastest growing frontend communities.  Join thousands fellow developers leveling up their skills together."
        actions={<MailingListSignup onSubscribe={() => {}} />}
      />
      <StyledCommunity />
      <Stats>
        <NpmDownloadCount
          status="default"
          downloads={npmDownloads}
          text="Downloads/month"
          noPlural
          countLink={null}
        />
        <Stat status="default" count="400+" text="Integrations" noPlural />
        <Stat status="default" count={githubStars.toLocaleString()} text="GitHub Stars" noPlural />
        <Stat
          status="default"
          count={githubContributorCount.toLocaleString()}
          text="Contributors"
          noPlural
        />
        <Stat
          status="default"
          count={discordMemberCount.toLocaleString()}
          text="Discord members"
          noPlural
        />
        <Stat
          status="default"
          count={twitterFollowerCount.toLocaleString()}
          text="Twitter followers"
          noPlural
        />
        <Stat
          status="default"
          count={youTubeSubscriberCount.toLocaleString()}
          text="YouTube subscribers"
          noPlural
        />
      </Stats>
      <DividerWrapper>
        <Divider />
      </DividerWrapper>
    </Wrapper>
  );
}