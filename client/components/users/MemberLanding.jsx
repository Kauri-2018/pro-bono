import React from 'react'

import NewMatter from '../matters/NewMatter'
import FindMatterById from '../matters/FindMatterById'
import ApproveProfiles from './ApproveProfiles'

const MemberLanding = () => {
  return (
    <div>
      <div className="tab-new-matter">
        <button className="tablinks" onClick="openNewMatter(event, 'NewMatter')">Add new matter</button>
        <div id="NewMatter" className="tabcontent">
          <NewMatter key='new-matter' />
        </div>
      </div>
      <div className="tab-find-matter">
        <button className="tablinks" onClick="openFindMatterById(event, 'FindMatterById')">Find a matter</button>
        <div id="FindMatterById" className="tabcontent">
          <FindMatterById key='find-matter-by-id' />
        </div>
      </div>
      <div className="tab-approve-user">
        <button className="tablinks" onClick="openApproveUser(event, 'ApproveUser')">Approve users</button>
        <div id="ApproveUser" className="tabcontent">
          <ApproveProfiles key='approve-user' />
        </div>
      </div>
    </div>
  )
}

export default MemberLanding
