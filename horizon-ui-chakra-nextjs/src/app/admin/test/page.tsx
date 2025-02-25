'use client';

import { Box, Input, Checkbox, Text, Flex, Tag, VStack } from '@chakra-ui/react';

const emails = [
  { name: 'Jullu Jalal', label: 'Primary', subject: 'Our Bachelor of Commerce program is ACBSB-accredited.', time: '8:38 AM' },
  { name: 'Minerva Barnett', label: 'Work', subject: 'Get Best Advertiser In Your Side Pocket', time: '8:13 AM' },
  { name: 'Peter Lewis', label: 'Friends', subject: 'Vacation Home Rental Success', time: '7:52 PM' },
  { name: 'Anthony Briggs', label: '', subject: 'Free Classifieds Using Them To Promote Your Stuff Online', time: '7:52 PM' },
  { name: 'Clifford Morgan', label: 'Social', subject: 'Enhance Your Brand Potential With Giant Advertising Blimps', time: '4:13 PM' },
];

const getLabelColor = (label: string) => {
  const colors = {
    Primary: 'green',
    Work: 'blue',
    Friends: 'pink',
    Social: 'orange',
  };
  return colors[label as keyof typeof colors] || 'gray';
};

export default function TestPage() {
  return (
    <Box maxW="1200px" mx="auto" p={6}>
      <Box bg="white" borderRadius="xl" shadow="sm" p={6}>
        <Input
          placeholder="搜索邮件"
          mb={6}
          size="lg"
          variant="filled"
        />
        <VStack spacing={4} align="stretch">
          {emails.map((email, index) => (
            <Flex
              key={index}
              p={4}
              borderBottom="1px"
              borderColor="gray.100"
              align="center"
              _hover={{ bg: 'gray.50' }}
            >
              <Checkbox colorScheme="brand" mr={4} />
              <Text fontWeight="medium" w="200px">{email.name}</Text>
              {email.label && (
                <Tag
                  size="md"
                  variant="solid"
                  colorScheme={getLabelColor(email.label)}
                  mr={4}
                >
                  {email.label}
                </Tag>
              )}
              <Text flex="1" noOfLines={1}>{email.subject}</Text>
              <Text color="gray.500" w="100px" textAlign="right">{email.time}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}

