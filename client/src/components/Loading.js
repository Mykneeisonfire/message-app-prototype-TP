import { Stack, Skeleton } from "@chakra-ui/react";
import React from "react";

function Loading() {
  return (
    <Stack>
      <Skeleton height="40px" />
    </Stack>
  );
}

export default Loading;
