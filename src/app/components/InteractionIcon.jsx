export default function InteractionIcons(username) {
  return (
    <div className="flex">
      <div>
        <p>("No. of voices")</p>
        {/* <img src="" alt="amp svg Icon" /> */}
      </div>
      <div>
        <p>voices first_name's voices": {username}</p>
        <div className="flex w-8 h-auto bg-blue-600">
          {/* <img src="" alt="amp svg Icon" />
            <img src="" alt="amp svg Icon" />
            <img src="" alt="amp svg Icon" />
            <img src="" alt="amp svg Icon" /> */}
        </div>
      </div>
    </div>
  );
}
