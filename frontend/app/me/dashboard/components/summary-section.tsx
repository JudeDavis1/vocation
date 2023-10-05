"use client";

import axios from "axios";
import React from "react";
import { Loader } from "lucide-react";

import { backendRoutes } from "@/config";

interface IUserData {}

export function SummarySection() {
  const [fetching, setFetching] = React.useState(true);
  const [userData, setUserData] = React.useState<IUserData>();
  React.useEffect(() => {
    axios
      .get(backendRoutes.user.get, { withCredentials: true })
      .then((data) => {
        setUserData(data);
        setFetching(false);
      });
  }, [userData]);

  return (
    <div>
      {fetching && <Loader className="animate-spin" />}
      {userData && <div>Loaded!</div>}
    </div>
  );
}
