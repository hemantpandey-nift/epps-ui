export type Membership = { membershipType: string; availibilityDays: string[] };

export type UserType = {
  _id: string;
  name: string;
  age: number;
  weight: number;
  userMembership: Membership;
};
