<template>
  <div>
    <form
      class="bg-josa-warm-grey p-4"
      autocomplete="on"
      @submit.prevent="submitForm"
    >
      <div>
        <div class="input-control">
          <label for="firstName">First Name*:</label>
          <input
            id="firstName"
            v-model="personal_information.first_name"
            type="text"
            name="firstName"
            value="John"
            required
          />
        </div>
        <div class="input-control">
          <label for="lastName">Last name*:</label>
          <input
            id="lastName"
            v-model="personal_information.last_name"
            type="text"
            name="lastName"
            value="John"
            required
          />
        </div>
        <div class="input-control">
          <label for="email">Email*:</label>
          <input
            id="email"
            v-model="personal_information.email"
            type="email"
            name="email"
            value="John@example.com"
            required
          />
        </div>
        <div class="input-control">
          <label for="phone">Phone:</label>
          <input
            id="phone"
            v-model="personal_information.phone"
            type="tel"
            name="phone"
            value="00962"
          />
        </div>
        <div class="input-control">
          <label for="resume">Resume/CV*:</label>
          <input
            id="resume"
            type="file"
            name="resume"
            required
            @change="setSelectedFile"
          />
        </div>
        <div class="input-control">
          <label for="coverLetter">Cover Letter*:</label>
          <textarea
            id="coverLetter"
            v-model="professional_information.cover_letter"
            name="coverLetter"
            cols="30"
            rows="10"
            required
          ></textarea>
        </div>
        <div class="input-control">
          <label for="linkedInProfile">LinkedIn Profile:</label>
          <input
            id="linkedInProfile"
            v-model="professional_information.linkedin_profile"
            type="url"
            name="linkedInProfile"
            value=""
          />
        </div>
        <div class="input-control">
          <label for="website">Website:</label>
          <input
            id="website"
            v-model="professional_information.website"
            type="url"
            name="website"
            value=""
          />
        </div>
        <div class="input-control">
          <label for="whenCanStart">When can you start?</label>
          <input
            id="whenCanStart"
            v-model="questions.when_can_start"
            type="Date"
            name="whenCanStart"
          />
        </div>
        <div class="input-control">
          <label for="salaryDesired">Salary Desired:</label>
          <input
            id="salaryDesired"
            v-model="questions.salary_desired"
            type="text"
            name="salaryDesired"
          />
        </div>
        <div class="input-control options">
          <p>Are you currently employed?</p>
          <input
            id="currentlyEmployed_yes"
            v-model="questions.currently_employed"
            type="radio"
            name="currentlyEmployed"
            :value="true"
          />
          <label for="currentlyEmployed_yes">Yes</label>
          <input
            id="currentlyEmployed_no"
            v-model="questions.currently_employed"
            type="radio"
            name="currentlyEmployed"
            :value="false"
          />
          <label for="currentlyEmployed_no">No</label>
        </div>
        <div class="input-control options">
          <p>If so, can we inquire your current employer?</p>
          <input
            id="inquire_yes"
            v-model="questions.inquire_current_employer"
            type="radio"
            name="inquire"
            :value="true"
          />
          <label for="inquire_yes">Yes</label>
          <input
            id="inquire_no"
            v-model="questions.inquire_current_employer"
            type="radio"
            name="inquire"
            :value="false"
          />
          <label for="inquire_no">No</label>
        </div>
        <div class="input-control options">
          <p>Have you ever applied to JOSA before?</p>
          <input
            id="appliedBefore_yes"
            v-model="questions.applied_to_josa_before"
            type="radio"
            name="appliedBefore"
            :value="true"
          />
          <label for="appliedBefore_yes">Yes</label>
          <input
            id="appliedBefore_no"
            v-model="questions.applied_to_josa_before"
            type="radio"
            name="appliedBefore"
            :value="false"
          />
          <label for="appliedBefore_no">No</label>
        </div>
        <div class="input-control options">
          <p>Are you a JOSA Member?</p>
          <input
            id="josaMember_yes"
            v-model="questions.josa_member"
            type="radio"
            name="josaMember"
            :value="true"
          />
          <label for="josaMember_yes">Yes</label>
          <input
            id="josaMember_no"
            v-model="questions.josa_member"
            type="radio"
            name="josaMember"
            :value="false"
          />
          <label for="josaMember_no">No</label>
        </div>
        <div class="input-control">
          <label for="referredBy"
            >If referred by a current JOSA employee, please tell us who.</label
          >
          <input
            id="referredBy"
            v-model="questions.referred_by"
            type="text"
            name="referredBy"
          />
        </div>
        <div class="input-control options">
          <p>
            Do you give consent to JOSA to process your personal information in
            accordance to our
            <NuxtLink
              target="_blank"
              to="/info/privacypolicy#introduction-privacy"
              >Privacy Policy</NuxtLink
            >?*
          </p>
          <input
            id="consent_yes"
            v-model="consent"
            type="radio"
            name="consent"
            :value="true"
          />
          <label for="consent_yes">Yes</label>
          <input
            id="consent_no"
            v-model="consent"
            type="radio"
            name="consent"
            :value="false"
          />
          <label for="consent_no">No</label>
        </div>
        <div>
          <AppButton
            class="input-control"
            btn-style="button-flat"
            :btn-disabled="btnDisabled"
            ><p>Apply</p></AppButton
          >
        </div>
      </div>
    </form>
    <client-only>
      <notifications classes="my-style" group="feedback" />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'ApplyForm',
  components: {
    AppButton: () => import('@/components/FormComponents/AppButton'),
  },
  props: {
    careerObject: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedFile: null,
      consent: null,
      btnDisabled: false,
      personal_information: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
      },
      professional_information: {
        cover_letter: null,
        linkedin_profile: null,
        website: null,
        resume: null,
      },
      questions: {
        career_types: [],
        when_can_start: null,
        salary_desired: null,
        currently_employed: null,
        inquire_current_employer: null,
        applied_to_josa_before: null,
        josa_member: null,
        referred_by: null,
      },
      career: this.careerObject.id,
    }
  },
  methods: {
    setSelectedFile(event) {
      this.selectedFile = event.target.files[0]
    },
    submitForm() {
      const formData = new FormData()
      formData.append('files', this.selectedFile, this.selectedFile.name)

      if (this.consent === true) {
        if (
          this.personal_information.first_name &&
          this.personal_information.last_name &&
          this.personal_information.email &&
          this.professional_information.cover_letter &&
          this.selectedFile
        ) {
          this.btnDisabled = true
          this.$axios
            .post('/api/upload', formData)
            .then((response) => {
              const fileId = response.data[0].id
              this.professional_information.resume = fileId
              this.$axios({
                method: 'post',
                url: '/api/job-applications',
                data: {
                  personal_information: this.personal_information,
                  professional_information: this.professional_information,
                  questions: this.questions,
                  career: this.career,
                },
              }).then((res) => {
                this.btnDisabled = false
                if (res.status === 200) {
                  this.$notify({
                    group: 'feedback',
                    type: 'success',
                    title: 'Your inquiry has been sent',
                    text: 'We will get back to you as soon as possible.',
                    duration: '5000',
                    width: '35%',
                  })
                } else {
                  this.$notify({
                    group: 'feedback',
                    type: 'error',
                    title: 'Your inquiry has not been sent',
                    text: 'There was an error while sending your inquiry, please try again later.',
                    width: '35%',
                  })
                }
              })
            })
            .catch(() => {
              this.btnDisabled = false
              this.$notify({
                group: 'feedback',
                type: 'error',
                title: 'Your inquiry has not been sent',
                text: 'There was an error while sending your inquiry, please try again later.',
                width: '35%',
              })
            })
        } else {
          this.$notify({
            group: 'feedback',
            type: 'warn',
            title: 'Please fill all the required fields',
            text: 'Some required fields are missing',
            duration: '5000',
            width: '35%',
          })
        }
      } else {
        this.$notify({
          group: 'feedback',
          type: 'warn',
          title: 'We need your consent in order to process your data',
          text: 'in accordance to our Privacy Policy',
          duration: '5000',
          width: '35%',
        })
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
input {
  @apply w-full p-4 rounded-sm;
}

input::placeholder {
  @apply text-josa-warm-grey-dark;
}

textarea::placeholder {
  @apply text-josa-warm-grey-dark;
}

label {
  @apply block;
}

.input-control {
  @apply m-6;
}
.input-control input,
.input-control textarea {
  @apply block w-full box-border p-2 mb-4 border-gray-400 border border-solid;
  font: inherit;
}

.input-control input:focus,
.input-control textarea:focus {
  @apply bg-gray-100;
  outline: none;
}
.options label,
.options input {
  @apply inline-block w-auto mr-1;
}

.options label:first-of-type {
  @apply mr-4;
}
</style>

<style lang="scss">
.my-style {
  padding: 10px;
  margin: 0 5px 5px;
  font-size: 12px;
  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;
  .notification-title {
    font-size: 1.1rem;
  }
  .notification-content {
    font-size: 1rem;
  }
  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }
  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }
}
</style>
