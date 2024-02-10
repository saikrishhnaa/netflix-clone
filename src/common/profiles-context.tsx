import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ActionType, ProfilesContextType } from "./types";
import { useAuth } from "./auth";
import profileReducer from "../reducer/profileReducer";

type StoredProfiles = Map<String, ProfilesContextType>;
const LOCAL_STORAGE_KEY = "profiles";

const ProfileContext = createContext<ProfilesContextType | null>(null);

const ProfileDispatchContext = createContext<React.Dispatch<ActionType> | null>(
  null,
);

function ProfilesProvider({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();

  const userProfiles = findProfile(user?.email as string);

  const [state, dispatch] = useReducer(profileReducer, userProfiles);

  useEffect(() => {
    if (user?.email) {
      if (state) {
        const storedProfiles = getProfiles();
        storedProfiles.set(user.email, state as ProfilesContextType);
        updateProfiles(storedProfiles);
      } else {
        dispatch({ type: "load", payload: userProfiles });
      }
    }
  }, [user?.email, state]);

  return (
    <ProfileContext.Provider value={state}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
}

function getProfiles(): StoredProfiles {
  return new Map(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]"));
}

function findProfile(id: string) {
  const profiles = getProfiles();
  return id ? profiles.get(id) ?? null : null;
}

function updateProfiles(profiles: StoredProfiles) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(profiles)));
}

export const useProfilesContext = () => useContext(ProfileContext);
export const useProfilesDispatchContext = () =>
  useContext(ProfileDispatchContext) as React.Dispatch<ActionType>;

export default ProfilesProvider;
