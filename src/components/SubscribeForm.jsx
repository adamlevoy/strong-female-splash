import { useState } from "react";

export function SubscribeForm() {
  const [emailAddress, setEmailAddress] = useState("");
  const [profileId, setProfileId] = useState("");
  const [profile, setProfile] = useState(null);

  const createProfileUrl = "/.netlify/functions/createProfile?";
  const addProfileToListUrl = "/.netlify/functions/addProfileToList?";

  async function addSubscriber() {
    await fetch(`${createProfileUrl}emailAddress=${emailAddress}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return fetch(`${addProfileToListUrl}profileId=${data.data.id}`);
      })
      .catch((err) => console.log("ERROR:", err));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    addSubscriber();
    setEmailAddress("");
  }

  return (
    <form
      id="subscribe"
      className="bg-white rounded-xl overflow-hidden shadow-2xl flex mt-10 text-black"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="email"
        value={emailAddress}
        placeholder="Email address"
        required
        onChange={(e) => setEmailAddress(e.target.value)}
      />
      <button
        type="submit"
        form="subscribe"
        className="button-primary text-white py-2 px-4"
      >
        Join Us
      </button>
    </form>
  );
}
