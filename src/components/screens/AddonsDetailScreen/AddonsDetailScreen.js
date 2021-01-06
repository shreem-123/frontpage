import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';
import {
  styles,
  Link,
  TagList,
  TagLink,
  TagItem,
  Highlight,
  Avatar,
} from '@storybook/design-system';
import useSiteMetadata from '../../lib/useSiteMetadata';
import { SocialGraph, Breadcrumb } from '../../basics';
import { AddonsAside, AddonsAsideContainer } from '../../layout/addons/AddonsAsideLayout';
import { AddonsSubheading } from '../../layout/addons/AddonsSubheading';
import { AddonItemDetail } from '../../layout/addons/AddonItemDetail';
import { AddonsLayout } from '../../layout/addons/AddonsLayout';
import Eyebrow from '../../layout/Eyebrow';
import { mdFormatting } from '../../../styles/formatting';
import { generateBreadcrumb } from '../../../util/generate-breadcrumb';

const { color, typography, spacing } = styles;

const StyledTagsList = styled(TagList)`
  margin-bottom: 30px;
`;

const ReadMe = styled.section`
  flex: 1 1 820px;
  min-width: 0;
  max-width: 820px;
  ${mdFormatting}
`;

const ReadMeTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  ${AddonsSubheading} {
    margin-bottom: 0;
  }
`;

const ViewOnGithubLink = styled(Link)`
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m2}px;
  margin-left: ${spacing.padding.medium}px;
`;

const AuthorName = styled.div`
  color: ${color.darkest};
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m1}px;
  margin-left: ${spacing.padding.small}px;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const AuthorListInner = styled.div`
  margin-bottom: 40px;
`;

const MoreAuthors = styled.div`
  color: ${color.darkest};
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m1}px;
  margin-left: ${spacing.padding.small}px;
`;

const AuthorList = ({ authors }) => {
  const authorsSubset = useMemo(() => authors.slice(0, 5), [authors]);
  const more = useMemo(() => authors.length - 5, [authors]);

  return (
    <AuthorListInner>
      {authorsSubset.map((author) => (
        <Author key={author.id}>
          <Avatar size="medium" username={author.name} src={author.avatarUrl} />
          <AuthorName>{author.name}</AuthorName>
        </Author>
      ))}
      {more > 0 && <MoreAuthors>{`+ ${more} more`}</MoreAuthors>}
    </AuthorListInner>
  );
};

const Framework = styled(TagItem)`
  display: inline-flex;
  align-items: center;
`;

const FrameworkIcon = styled.img`
  margin-right: 8px;
  width: 1em;
  height: 1em;
`;

const MissingInfo = styled(Eyebrow)`
  margin-bottom: 40px;
  padding: ${spacing.padding.medium}px;
`;

export const AddonsDetailScreen = ({ path, location, pageContext }) => {
  const {
    homepageUrl,
    repositoryUrl,
    readme,
    compatibility,
    tags,
    authors,
    ...addon
  } = pageContext;
  const { title, ogImageAddons, urls = {} } = useSiteMetadata();
  const { home } = urls;

  const breadcrumb = generateBreadcrumb(location.state);

  return (
    <>
      <SocialGraph
        title={`${addon.displayName || addon.name} Addon | ${title}`}
        desc={addon.description || ''}
        url={`${home}${path}`}
        image={ogImageAddons}
      />
      <AddonsLayout hideSidebar>
        <Breadcrumb to={breadcrumb.link}>{breadcrumb.title}</Breadcrumb>
        <AddonItemDetail {...addon} />
        <AddonsAsideContainer>
          <ReadMe>
            <ReadMeTitle>
              <AddonsSubheading>Readme</AddonsSubheading>
              <ViewOnGithubLink
                href={repositoryUrl || homepageUrl}
                target="_blank"
                rel="noopener nofollow noreferrer"
              >
                View on GitHub
              </ViewOnGithubLink>
            </ReadMeTitle>
            <Highlight withHTMLChildren={false}>
              {/* eslint-disable react/no-danger */}
              {readme ? (
                <div dangerouslySetInnerHTML={{ __html: readme }} />
              ) : (
                <MissingInfo warning>Readme not available</MissingInfo>
              )}
            </Highlight>
          </ReadMe>
          <AddonsAside>
            <AddonsSubheading>Made by</AddonsSubheading>
            <AuthorList authors={authors} />
            {compatibility?.length > 0 && (
              <>
                <AddonsSubheading>Works with</AddonsSubheading>
                <StyledTagsList
                  limit={6}
                  tags={compatibility.map((framework) => (
                    <Framework key={framework.name}>
                      {framework.icon && <FrameworkIcon src={framework.icon} />}
                      {framework.displayName}
                    </Framework>
                  ))}
                />
              </>
            )}
            {tags?.length > 0 && (
              <>
                <AddonsSubheading>Tags</AddonsSubheading>
                <StyledTagsList
                  limit={6}
                  tags={tags.map((tag) => (
                    <TagLink LinkWrapper={GatsbyLink} key={tag.link} to={tag.link}>
                      {tag.name}
                    </TagLink>
                  ))}
                />
              </>
            )}
          </AddonsAside>
        </AddonsAsideContainer>
      </AddonsLayout>
    </>
  );
};

AddonsDetailScreen.propTypes = {
  pageContext: PropTypes.shape({
    repositoryUrl: PropTypes.string,
    homepageUrl: PropTypes.string,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        avatarUrl: PropTypes.string,
      })
    ).isRequired,
    compatibility: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        icon: PropTypes.string,
      })
    ),
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    readme: PropTypes.string,
    ...AddonItemDetail.propTypes,
  }).isRequired,
};

AddonsDetailScreen.defaultProps = {};

export default AddonsDetailScreen;
