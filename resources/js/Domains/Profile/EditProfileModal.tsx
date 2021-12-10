import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import Button from '@/Components/Button';
import { Nullable, User } from '@/types';
import { useForm } from '@inertiajs/inertia-react';
import useRoute from '@/Hooks/useRoute';
import { Inertia } from '@inertiajs/inertia';
import classNames from 'classnames';
import usePhotoInput from '@/Hooks/usePhotoInput';

interface BaseInputProps {
  label: string;
}

type MultilineProps = BaseInputProps & {
  multiline: true;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;

type SinglelineProps = BaseInputProps & {
  multiline?: false;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

type InputProps = MultilineProps | SinglelineProps;

function Input({ label, multiline = false, ...props }: InputProps) {
  return (
    <div
      className={
        'transition border border-gray-400 rounded p-2 focus-within:border-brand text-gray-400 focus-within:text-brand'
      }
    >
      <div className={'flex items-start justify-between'}>
        <label htmlFor={props.id} className={'flex-1'}>
          {label}
        </label>
        {/* {max && (
          <span className={'text-white'}>
            {value} / {max}
          </span>
        )} */}
      </div>
      {(() => {
        if (multiline) {
          return (
            <textarea
              {...(props as MultilineProps)}
              className={classNames(
                'bg-transparent text-white p-0 border-none w-full resize-none',
                props.className,
              )}
            />
          );
        }
        return (
          <input
            type="text"
            {...(props as SinglelineProps)}
            className={classNames(
              'bg-transparent text-white p-0 border-none w-full',
              props.className,
            )}
          />
        );
      })()}
    </div>
  );
}

interface Props {
  isOpen: boolean;
  onClose(): void;
  user: User;
}

export default function EditProfileModal({ isOpen, onClose, user }: Props) {
  const form = useForm({
    name: user.name,
    bio: user.bio || '',
    location: user.location || '',
    website: user.website || '',
    photo: null as File | null,
    cover: null as File | null,
    _method: 'PUT',
  });
  const route = useRoute();
  const cancelButtonRef = useRef(null);
  const profilePhoto = usePhotoInput({ initial: user.profile_photo_path });
  const coverPhoto = usePhotoInput({ initial: user.cover_photo_path });

  function onSave() {
    form.post(route('users.update', [user]), {
      onSuccess() {
        onClose();
        Inertia.reload();
      },
    });
  }

  function getBgImageStyle(url: Nullable<string>) {
    if (!url) {
      return {};
    }

    return {
      backgroundImage: `url('${url}')`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
    };
  }

  useEffect(() => {
    form.setData('photo', profilePhoto.value);
  }, [profilePhoto.value]);

  useEffect(() => {
    form.setData('cover', coverPhoto.value);
  }, [coverPhoto.value]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div
                className={
                  'border-b border-divider flex justify-between items-center p-4'
                }
              >
                <div className={'flex items-center space-x-4'}>
                  <button className={'p-2 rounded'} onClick={onClose}>
                    <XIcon className={'text-white w-6 h-6'} />
                  </button>
                  <h3 className={'text-white text-xl font-bold'}>
                    Edit Profile
                  </h3>
                </div>
                <Button appearance={'filled'} color={'white'} onClick={onSave}>
                  Save
                </Button>
              </div>
              <div
                className="h-48 w-full flex bg-orange-100 items-center justify-center relative"
                style={getBgImageStyle(coverPhoto.preview)}
              >
                <div className="w-full h-full bg-black bg-opacity-25 absolute top-0 left-0"></div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={coverPhoto.openFilePicker}
                    className={
                      'p-2 cursor-pointer hover:bg-white hover:bg-opacity-25 rounded-full relative z-10'
                    }
                  >
                    <CameraIcon className={'w-6 h-6 text-white'} />
                  </button>
                  {coverPhoto.preview ? (
                    <button
                      onClick={coverPhoto.onRemove}
                      className={
                        'p-2 cursor-pointer hover:bg-white hover:bg-opacity-25 rounded-full relative z-10'
                      }
                    >
                      <TrashIcon className={'w-6 h-6 text-red-400'} />
                    </button>
                  ) : null}
                </div>
                {coverPhoto.input}
              </div>
              <div className="space-y-4 px-4 pt-5 pb-4 sm:p-6 relative -top-16">
                <div className={'flex items-end space-x-2'}>
                  <div
                    className={
                      'w-28 h-28 rounded-full border border-gray-400 flex items-center justify-center relative'
                    }
                    style={getBgImageStyle(profilePhoto.preview)}
                  >
                    <div className="w-full h-full bg-black bg-opacity-25 absolute top-0 left-0 rounded-full"></div>
                    <button
                      onClick={profilePhoto.openFilePicker}
                      className={
                        'p-2 cursor-pointer hover:bg-white hover:bg-opacity-25 rounded-full relative z-10'
                      }
                    >
                      <CameraIcon className={'w-6 h-6 text-white'} />
                    </button>
                    {profilePhoto.input}
                  </div>
                  {profilePhoto.preview ? (
                    <button
                      className={'cursor-pointer'}
                      onClick={profilePhoto.onRemove}
                    >
                      <TrashIcon className={'w-4 h-4 text-red-400'} />
                    </button>
                  ) : null}
                </div>
                <Input
                  label={'Name'}
                  id={'name'}
                  value={form.data.name}
                  onChange={e => form.setData('name', e.currentTarget.value)}
                  type="text"
                  placeholder={'Your Name'}
                />
                <Input
                  label={'Bio'}
                  id={'bio'}
                  value={form.data.bio}
                  placeholder={'Let people know who you are'}
                  onChange={e => form.setData('bio', e.currentTarget.value)}
                  multiline={true}
                />
                <Input
                  label={'Location'}
                  id={'location'}
                  max={30}
                  value={form.data.location}
                  type="text"
                  placeholder={'Where are you?'}
                  onChange={e =>
                    form.setData('location', e.currentTarget.value)
                  }
                />
                <Input
                  label={'Website'}
                  id={'website'}
                  value={form.data.website}
                  type="text"
                  placeholder={'Website'}
                  onChange={e => form.setData('website', e.currentTarget.value)}
                />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
