import { ActionType, ProfilesContextType, UserProfile } from "../common/types";

export default function profileReducer(
  state: ProfilesContextType,
  action: ActionType,
) {
  const { type, payload } = action;
  switch (type) {
    case "add": {
      const newProfile: UserProfile = {
        id: crypto.randomUUID(),
        name: payload.name as string,
        imageUrl: payload.imageUrl as string,
      };
      const updatedProfiles = [...(state?.profiles ?? []), newProfile];
      const updatedState: ProfilesContextType = {
        profiles: updatedProfiles,
        selectedProfileId: state?.selectedProfileId,
      };
      return updatedState;
    }
    case "edit": {
      const index =
        state.profiles?.findIndex((profile) => profile.id === payload.id) ?? -1;
      if (index > -1 && state) {
        const updatedState = { ...state };
        updatedState.profiles.splice(index, 1, {
          ...updatedState.profiles[index],
          name: payload.name as string,
        });
        return updatedState;
      }
      break;
    }
    case "delete": {
      if (state) {
        let updatedState = { ...state };
        updatedState.profiles = updatedState.profiles.filter(
          (profile) => profile.id !== payload.id,
        );
        return updatedState;
      }
      break;
    }
    case "current": {
      if (state) {
        let updatedState: ProfilesContextType = {
          ...state,
          selectedProfileId: payload.id as string,
        };
        return updatedState;
      }
      break;
    }
    case "load": {
      return payload;
    }
  }
}
