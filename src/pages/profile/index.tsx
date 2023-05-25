import { Box, Card, Container, Stack, Typography } from "@mui/material";
import { useAuthContext } from "@/common/contexts/authContext";
import Image from "next/image";

function ProfilePage() {
  const { email, firstname, lastname, role, active } = useAuthContext() || {};

  return (
    <Stack alignItems="center" mt={4}>
      <Box width={600}>
        <Card>
          <Container>
            <Stack py={3} alignItems="center">
              <Box
                position="relative"
                width={160}
                height={160}
                borderRadius="100%"
                mb={2}
              >
                <Image src="/avatar.png" alt="avatar" fill />
              </Box>
              <Typography variant="h6">{email}</Typography>
              <Typography variant="h6">
                {firstname} {lastname}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {role}
              </Typography>
              <Typography variant="subtitle2">
                {(active ? "Active" : "Inactive") + " User"}
              </Typography>
            </Stack>
          </Container>
        </Card>
      </Box>
    </Stack>
  );
}

export default ProfilePage;
