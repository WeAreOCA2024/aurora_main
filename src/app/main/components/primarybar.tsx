import React, { useState } from 'react';
import { ServerCreateModal } from './serveraddmodal';

interface PrimarybarProps {
  setSelectedPrimaryIcon: (icon: string) => void;
  selectedPrimaryIcon: string;
}

export const PrimarybarComponent = ({ setSelectedPrimaryIcon, selectedPrimaryIcon }: PrimarybarProps) => {
  const [serverCreateModal, setServerCreateModal] = useState(false);

  const PrimaryIcons = ({ name, icon }: { name: string; icon: string }) => {
    return (
      <p
        className={`text-3xl w-14 h-14 border-2 ${name !== selectedPrimaryIcon ? "border-neutral-600" : "border-white"} rounded-2xl flex justify-center items-center text-white`}
        onClick={() => { setSelectedPrimaryIcon(name) }}
      >
        {icon}
      </p>
    );
  };


  return (
    <>
      <PrimaryIcons name="dm" icon="📩" />
      <PrimaryIcons name="server" icon="👥" />
      <PrimaryIcons name="notification" icon="📁" />
      <button
        className={`text-3xl w-14 h-14 border-2 border-neutral-600 rounded-2xl flex justify-center items-center text-white`}
        onClick={() => setServerCreateModal(true)}
      >
        十
      </button>

      {serverCreateModal && <ServerCreateModal setServerCreateModal={setServerCreateModal} />}
    </>
  );
};