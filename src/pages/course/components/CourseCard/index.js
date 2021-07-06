import React from 'react';
import PropTypes from 'prop-types';
import {
  LinkBox,
  Box,
  Image,
  Text,
  LinkOverlay,
  Popover,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  Button,
  Heading,
  useMediaQuery,
} from '@chakra-ui/react';

import { truncateString } from '../../../../utils/stringUtils';
import StarGroup from '../../../../components/StarGroup';

function CourseCard(props) {
  const [isLargeScreen] = useMediaQuery('(min-width: 42rem)');
  const {
    id,
    title,
    description,
    imageURL,
    price,
    instructor,
    rate,
    category,
  } = props.data;
  const { rating, score } = rate;
  const point = rating > 0 ? score / (rating * 2) : 0;

  return (
    <LinkBox as="article" textAlign="left">
      <Popover trigger="hover" placement="auto">
        <PopoverTrigger>
          <Box bgColor="white">
            <Image rounded="md" src={imageURL} w="full" h="160px" />

            <Heading as="h4" fontSize="lg" mt="3" mb="1">
              <LinkOverlay href={`/categories/${category?.name}/courses/${id}`}>
                {title}
              </LinkOverlay>
            </Heading>
            <Text mb="1" fontSize="sm" color="gray.400">
              {`${instructor.firstName} ${instructor.lastName}`}
            </Text>
            <StarGroup point={point} rating={rating} />
            <Text fontWeight="bold" mt="1">
              ${price}
            </Text>
          </Box>
        </PopoverTrigger>
        {isLargeScreen && (
          <PopoverContent
            color="black"
            bg="white"
            borderColor="gray.300"
            px="3"
            py="4"
          >
            <PopoverArrow />
            <PopoverBody>
              <Heading as="h4" fontSize="2xl" mb="2">
                {truncateString(title, 50)}
              </Heading>
              <Text mb="3" fontSize="sm" color="gray.400">
                {`${instructor.firstName} ${instructor.lastName}`}
              </Text>
              <Text
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="wrap"
                fontSize="sm"
              >
                {truncateString(description, 180)}
              </Text>
            </PopoverBody>
            <PopoverFooter
              border="0"
              d="flex"
              alignItems="center"
              justifyContent="space-between"
              pb={4}
            >
              <Button colorScheme="red" width="full" color="white">
                Add To Card
              </Button>
            </PopoverFooter>
          </PopoverContent>
        )}
      </Popover>
    </LinkBox>
  );
}

CourseCard.prototype = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    instructor: PropTypes.object,
    vote: PropTypes.shape({
      rating: PropTypes.number,
      score: PropTypes.number,
    }),
  }),
};

export default CourseCard;
