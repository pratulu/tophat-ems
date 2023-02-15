import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import EMS_CLIENT from "../api";
import { addCandidate } from "../slices/app/CandidateSlice";
const CandidatesPage: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllCandidates();
  }, []);

  const fetchAllCandidates = async () => {
    const response = await EMS_CLIENT.get("get-all-candidates");
    dispatch(addCandidate(response.data.candidatesList));
    console.log("RESPONSE: ", response.data);
  };

  return <div>CandidatesPage</div>;
};

export default CandidatesPage;
